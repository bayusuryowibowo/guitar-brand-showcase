import { useEffect } from "react";
import { deleteProduct, fetchProducts } from "../stores/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function HomePage() {
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditClick = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      const { statusText, status, message } = await dispatch(deleteProduct(id));
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(fetchProducts());
    } catch (error) {
      const { statusText, status, message } = error;
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full leading-normal w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Updated At
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableRowLoading />
            ) : (
              <TableRow
                data={products}
                isProduct={true}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
