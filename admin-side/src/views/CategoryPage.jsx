import { useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
  fetchCategory,
  postCategory,
  putCategory,
} from "../stores/actions/actionCreator";
import { ToastContainer, toast } from "react-toastify";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { categories, loading, category } = useSelector(
    (state) => state.category
  );
  const [formInput, setFormInput] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(false);

  const resetInput = () => ({ name: "" });

  const onChangeInput = (event) => {
    const value = event.target.value;
    const eventInputName = event.target.name;
    setFormInput({ ...formInput, [eventInputName]: value });
  };

  useEffect(() => {
    if (isEdit && category) {
      setFormInput({ ...formInput, name: category.name });
    }
    dispatch(fetchCategories());
  }, [dispatch, isEdit]);

  const addCategory = async () => {
    try {
      const { statusText, status, message } = await dispatch(
        postCategory(formInput)
      );
      dispatch(fetchCategories());
      setFormInput(resetInput());
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

  const editCategory = async (id) => {
    try {
      const { statusText, status, message } = await dispatch(
        putCategory(id, formInput)
      );
      setFormInput(resetInput());
      setIsEdit(false);
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

  const handleEditClick = async (id) => {
    try {
      await dispatch(fetchCategory(id));
      setIsEdit(true);
      setFormInput({ ...formInput, name: category.name });
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

  const handleDeleteClick = async (id) => {
    try {
      const { statusText, status, message } = await dispatch(
        deleteCategory(id)
      );
      dispatch(fetchCategories());
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

  const handleCancelClick = () => {
    setFormInput(resetInput());
    setIsEdit(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isEdit === true ? editCategory(category.id) : addCategory();
  };

  return (
    <>
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="w-full">
          <div className="leading-loose">
            <form
              onSubmit={handleSubmit}
              className="p-5 bg-white rounded shadow-xl"
            >
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChangeInput}
                    value={formInput.name}
                    type="text"
                    name="name"
                    id="floating_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {loading ? "Loading..." : "Category Name"}
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <div className=" flex flex-row gap-5">
                    {isEdit ? (
                      <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add
                      </button>
                    )}
                    <button
                      onClick={handleCancelClick}
                      type="reset"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <table className="min-w-full leading-normal w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
            {loading ? (
              <TableRowLoading />
            ) : (
              <TableRow
                data={categories}
                isProduct={false}
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
