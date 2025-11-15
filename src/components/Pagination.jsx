const Pagination = ({ currentPage, totalPages, onPageChange, hasNext, hasPrevious }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16 mb-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-black disabled:text-gray-500 font-bold rounded-xl transition transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none"
      >
        ← Previous
      </button>
      <div className="bg-gray-900/80 px-6 py-3 rounded-xl border border-yellow-500/30">
        <span className="text-yellow-400 font-bold text-lg">
          Page {currentPage} <span className="text-gray-500">of</span> {totalPages}
        </span>
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-black disabled:text-gray-500 font-bold rounded-xl transition transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
