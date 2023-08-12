import { useEffect } from "react";
import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../stores/actions/actionCreator";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
