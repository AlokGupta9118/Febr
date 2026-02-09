import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-4xl mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-display hover:bg-primary/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;