import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Page Not Found - TastyBites';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-display font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors"
        >
          <Home size={18} className="mr-2" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;