import { useState, useEffect } from "react";
import { Button } from "flowbite-react";

const USERS_PER_PAGE = 10;

const View = ({ users, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIdx = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIdx, startIdx + USERS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
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
                {paginatedUsers.map((user, idx) => (
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
                ))}
              </tbody>
            </table>
          </div>
          <nav className="mt-4 flex justify-center" aria-label="Pagination">
            <ul className="flex items-center -space-x-px text-sm">
              <li>
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 h-8 flex items-center justify-center rounded-s-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <li key={pageNum}>
                    <button
                      onClick={() => handlePageClick(pageNum)}
                      className={`px-3 h-8 flex items-center justify-center border border-gray-300 ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 h-8 flex items-center justify-center rounded-e-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50"
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
