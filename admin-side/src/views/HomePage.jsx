import Card from "../components/Card";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchProducts,
} from "../stores/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";

const baseUrl = "http://localhost:3000";

export default function HomePage() {
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.loading);
  const categories = useSelector((state) => state.category.categories);
  const loadingCategories = useSelector((state) => state.category.loading);
  const [product, setProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: 0.0,
    mainImg: "",
    categoryId: "",
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const onChangeInput = (event) => {
    const value = event.target.value;
    const eventInputName = event.target.name;
    if (eventInputName === "name") {
      setInput({
        ...input,
        name: value,
        slug: generateSlug(value),
      });
    } else if (eventInputName === "price") {
      const floatPrice = parseFloat(value, 10);
      setInput({ ...input, price: floatPrice });
    } else {
      const eventInputValue =
        eventInputName === "categoryId" ? parseInt(value) : value;
      setInput({ ...input, [eventInputName]: eventInputValue });
    }
  };

  const postProduct = async () => {
    try {
      await fetch(baseUrl + "/products", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
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
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      setIsEdit(true);
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "GET",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    isEdit === true ? putProduct(product.id) : postProduct();
  };

  const handleDeleteClick = (id) => {
    deleteProduct(id);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className=" grid grid-cols-5 animate-pulse">
            <div className="rounded-none shadow-xl lg:rounded-lg lg:block lg:border-4 lg:border-solid border-gray-500">
              <img className="rounded-none lg:rounded-t-sm lg:block w-full object-cover cursor-pointer" />
              <div className="p-2 flex flex-col justify-around items-center h-28">
                <div>
                  <h5 className="text-xl text-black font-semibold text-center">
                    Loading...
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className=" grid grid-cols-5">
          {products.map((product) => (
            <Card
              product={product}
              key={product.id}
              onEditClick={getProduct}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={onChangeInput}
            value={input.name}
            type="text"
            name="name"
            className=" form-input"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={onChangeInput}
            value={input.description}
            name="description"
            cols="30"
            rows="10"
            className=" form-textarea"
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            onChange={onChangeInput}
            value={input.price}
            type="number"
            step="0.01"
            name="price"
            className=" form-input"
          />
        </div>
        <div>
          <label htmlFor="mainImg">Main Image</label>
          <input
            onChange={onChangeInput}
            value={input.mainImg}
            type="text"
            name="mainImg"
            className=" form-input"
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category</label>
          <select
            onChange={onChangeInput}
            value={input.categoryId}
            name="categoryId"
            className="form-select w-1/5 rounded-md focus:ring-sky-400 focus:border-sky-400 text-black"
          >
            {loadingCategories ? (
              <>
                <option>Loading...</option>
              </>
            ) : (
              <>
                <option disabled>-- Select Category --</option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div>
          <button type="submit">{isEdit === true ? "Edit" : "Add"}</button>
        </div>
      </form>
    </>
  );
}
