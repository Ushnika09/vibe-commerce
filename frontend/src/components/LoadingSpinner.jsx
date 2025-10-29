const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-primary"></div>
        <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="text-gray-600 text-xl font-semibold animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;