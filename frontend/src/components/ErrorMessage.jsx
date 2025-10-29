const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="relative text-8xl">⚠️</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800">Oops! Something went wrong</h3>
      <p className="text-gray-600 text-center max-w-md text-lg">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-base transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;