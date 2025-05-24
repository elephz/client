import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { listUser, deleteUser } from "@/api/user";
import { useSelector } from "react-redux"; 

export default function User() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.access_token);
  const role = useSelector((state) => state.user.role);
  const isAdmin = role === "admin";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  const fetchData = async (token, page) => {
    try {
      setIsLoading(true);
      const response = await listUser(token, page);
      setIsLoading(false);
      setUsers(response.data.data); // Set the fetched data
      setTotalPage(response.data.meta.pageCount);
      setCurrentPage(response.data.meta.currentPage);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    if (token) fetchData(token, 1);
  }, []);

  const handlePrevPage = () => {
    const page = Math.max(currentPage - 1, 1);
    fetchData(token, page);
  };

  const handleNextPage = () => {
    const page = Math.max(currentPage + 1, 1);
    fetchData(token, page);
  };
  
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
       try {
         await deleteUser(id, token);
         fetchData(token, currentPage);
       } catch (error) {
         console.log({ error });
       }
      return;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User List</h2>
        {isAdmin ? (
          <Link to="/user/new">
            <Button>Create User</Button>
          </Link>
        ) : (
          <Button disabled>Create User</Button>
        )}
      </div>
      <div className="overflow-x-auto rounded-xl border shadow-sm mt-6">
        <table className="min-w-full text-sm text-left text-gray-700 table-fixed">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 ">Name</th>
              <th className="px-4 py-3 ">Email</th>
              <th className="px-4 py-3 ">Role</th>
              <th className="px-4 py-3 w-48">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
            {!isLoading && users.length > 0 && (
              <>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 ">{user.name}</td>
                    <td className="px-4 py-3 ">{user.email}</td>
                    <td className="px-4 py-3 ">{user.role}</td>
                    <td className="px-4 py-3 w-32">
                      {isAdmin ? (
                        <>
                          <Link to={`/user/${user.id}/edit`}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            className="ml-2"
                            variant="destructive"
                            onClick={() => handleDelete(user.id, user.name)}
                            size="sm"
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button disabled variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            className="ml-2"
                            disabled
                            variant="destructive"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <span>
                        Page {currentPage} of {totalPage}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPage}
                        className="px-4 py-2 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
