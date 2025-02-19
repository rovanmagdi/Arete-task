import Button from "../../../components/Button";

const Pagination = ({ page, totalPages, limit, limits, updateParams }:{
    page: number;
    totalPages: number;
    limit: number;
    limits: number[];
    updateParams: (page: number, limit?: number) => void;
}) => {
  return (
    <div className="flex gap-2 items-center mb-4 justify-end mt-5">
        {/* Previous button */}
      <Button
        text="Previous"
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        disabled={page === 1}
        onClick={() => updateParams(Math.max(page - 1, 1))}
      />
{/*  total pages */}
      <div className="flex space-x-2">
        
        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded ${
                  page === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => updateParams(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )
        ) : (
          <>
            <button
              className={`px-3 py-1 rounded ${
                page === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => updateParams(1)}
            >
              1
            </button>

            {page > 3 && <span className="px-2">...</span>}

            {Array.from({ length: 5 }, (_, index) => page - 2 + index)
              .filter((p) => p > 1 && p < totalPages)
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 rounded ${
                    page === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                  onClick={() => updateParams(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

            {page < totalPages - 2 && <span className="px-2">...</span>}

            <button
              className={`px-3 py-1 rounded ${
                page === totalPages ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => updateParams(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
{/* Next button */}
      <Button
        text="Next"
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => updateParams(page + 1)}
        disabled={page >= totalPages}
      />

      <select
        className="ml-4 p-2 border rounded"
        value={limit}
        onChange={(e) => updateParams(1, Number(e.target.value))}
      >
        {limits.map((size:number) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
