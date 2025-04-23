import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseAuth = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    // Call this function when the component is mounted
    setData();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup the subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to sign up a new user
  const signUp = useCallback(async (email, password, metadata = {}) => {
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    
    setLoading(false);
    
    if (error) {
      throw error;
    }
    
    return data;
  }, []);

  // Function to sign in a user
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setLoading(false);
    
    if (error) {
      throw error;
    }
    
    return data;
  }, []);

  // Function to sign out
  const signOut = useCallback(async () => {
    setLoading(true);
    
    const { error } = await supabase.auth.signOut();
    
    setLoading(false);
    
    if (error) {
      throw error;
    }
  }, []);

  return {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
};