import { useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  postCategory,
  putCategory,
} from "../stores/actions/actionCreator";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const [formInput, setFormInput] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(false);

  const resetInput = () => ({ name: "" });

  const onChangeInput = (event) => {
    const value = event.target.value;
    const eventInputName = event.target.name;
    setFormInput({ ...formInput, [eventInputName]: value });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const addCategory = async () => {
    try {
      const { statusText, status, message } = await dispatch(
        postCategory(formInput)
      );
      setFormInput(resetInput());
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (id) => {
    try {
      const { statusText, status, message } = await dispatch(
        putCategory(id, formInput)
      );
      setFormInput(resetInput());
    } catch (error) {
      console.log(error);
    }
  };

  // const handleEditClick = (id) => {
  //   navigate(`/editproduct/${id}`);
  // };

  // const handleDeleteClick = async (id) => {
  //   try {
  //     const { statusText, status, message } = await dispatch(deleteProduct(id));
  //     dispatch(fetchProducts());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
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
                    Category Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
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
                // onEditClick={handleEditClick}
                // onDeleteClick={handleDeleteClick}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
