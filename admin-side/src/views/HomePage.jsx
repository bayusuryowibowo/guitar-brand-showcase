import { useEffect, useState } from "react";
import { fetchProducts } from "../stores/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function HomePage() {
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.loading);
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getProduct = async (id) => {
    try {
      console.log(id);
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const parsedData = await response.json();
      setProduct(parsedData);
      setInput(product);
    } catch (error) {
      console.log(error);
    }
  };

  const putProduct = async (id) => {
    try {
      await fetch(baseUrl + `/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      setInput({
        name: "",
        description: "",
        price: 0.0,
        mainImg: "",
        categoryId: "",
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(baseUrl + `/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const handleDeleteClick = (id) => {
    deleteProduct(id);
  };

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
