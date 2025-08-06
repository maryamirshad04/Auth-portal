import { useState, useEffect } from "react";
import { Button } from "flowbite-react";

const View = ({ users = [], totalPages = 1, currentPage = 1, onPageChange, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (pageNum) => {
    onPageChange(pageNum);
  };

  return (
    <>
      {loading ? (
        <div
          role="status"
          className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mx-auto mt-4"
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between pt-4 first:pt-0">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-3"></div>
                <div className="w-56 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
            </div>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Profile</th>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Username</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, idx) => (
                    <tr
                      key={user._id || idx}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user._id}
                      </th>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 flex flex-col md:flex-row gap-2">
                        <Button
                          size="xs"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => onEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => onDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <nav className="mt-4 flex justify-center" aria-label="Pagination">
  <ul className="inline-flex -space-x-px text-sm">
    {/* Previous Button */}
    <li>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg 
          ${currentPage === 1
            ? "text-gray-400 bg-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
      >
        Previous
      </button>
    </li>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, i) => {
      const pageNum = i + 1;
      const isActive = pageNum === currentPage;
      return (
        <li key={pageNum}>
          <button
            onClick={() => handlePageClick(pageNum)}
            className={`flex items-center justify-center px-3 h-8 leading-tight border 
              ${isActive
                ? "text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
          >
            {pageNum}
          </button>
        </li>
      );
    })}

    {/* Next Button */}
    <li>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg 
          ${currentPage === totalPages
            ? "text-gray-400 bg-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
      >
        Next
      </button>
    </li>
  </ul>
</nav>

        </>
      )}
    </>
  );
};

export default View;
