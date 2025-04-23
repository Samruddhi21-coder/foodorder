import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user || null);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAuth]);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            { 
              id: data.user.id, 
              email: data.user.email as string,
              full_name: fullName 
            }
          ]);

        if (profileError) throw profileError;

        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast.success('Signed in successfully!');
      return data;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signUp, 
      signIn, 
      signOut,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};