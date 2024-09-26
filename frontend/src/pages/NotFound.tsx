const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-neutral font-sans">
      <h1 className="text-6xl font-bold text-primary mb-4">404 Not Found</h1>
      <p className="text-lg text-neutral mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      {/* Add your custom design elements here */}
    </div>
  );
};

export default NotFound;
