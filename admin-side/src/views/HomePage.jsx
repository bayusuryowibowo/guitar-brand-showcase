import useFetch from "../hooks/useFetch";
import Card from "../components/Card";
import { useState } from "react";

const baseUrl = "http://localhost:3000";

export default function HomePage() {
  const { data: products, isLoading } = useFetch("/products");
  const { data: categories, isLoading: loadingCategories } =
    useFetch("/categories");
  const [product, setProduct] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const [input, setInput] = useState({
    name: "",
    slug: null,
    description: "",
    price: 0.0,
    mainImg: "",
    categoryId: null,
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
        slug: null,
        description: "",
        price: 0.0,
        mainImg: "",
        categoryId: null,
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
      setIsEdit(true)
      const response = await fetch(baseUrl + `/products/${id}`, {
        method: "GET",
      });
      const parsedData = await response.json();
      setProduct(parsedData);
      setInput(product)
    } catch (error) {
      console.log(error)
    }
  }

  const putProduct = async (id) => {
    try {
      console.log(id)
      await fetch(baseUrl + `/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInput({
        name: "",
        slug: null,
        description: "",
        price: 0.0,
        mainImg: "",
        categoryId: null,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setIsEdit(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    isEdit === true ? putProduct(product.id) : postProduct();
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
            <Card product={product} key={product.id} onEditClick={getProduct} />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={onChangeInput}
            value={isEdit === true ? input.name : undefined}
            type="text"
            name="name"
            className=" form-input"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={onChangeInput}
            value={isEdit === true ? input.description : undefined}
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
            value={isEdit === true ? input.price : undefined}
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
            value={isEdit === true ? input.mainImg : undefined}
            type="text"
            name="mainImg"
            className=" form-input"
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category</label>
          <select
            onChange={onChangeInput}
            value={isEdit === true ? input.categoryId : undefined}
            name="categoryId"
            className="form-select w-1/5 rounded-md focus:ring-sky-400 focus:border-sky-400 text-black"
          >
            {loadingCategories ? (
              <>
                <option>Loading...</option>
              </>
            ) : (
              <>
                <option disabled>
                  -- Select Category --
                </option>
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
          <button type="submit">{isEdit === true ? 'Edit' : 'Add'}</button>
        </div>
      </form>
    </>
  );
}
