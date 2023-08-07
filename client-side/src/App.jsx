import { useEffect, useState } from "react";
// import './App.css'
import Navbar from "./components/Navbar";

const baseUrl = "http://localhost:3000";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(baseUrl + "/products", {
        method: "GET",
      });
      const data = await response.json();
      setProducts(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <Navbar className="flex justify-center fixed w-full z-20 top-0 left-0 bg-blue-500 shadow-md border-b border-gray-400 dark:border-slate-500" />
      {isLoading ? (
        <>
          <div className=" grid grid-cols-5 animate-pulse">
            <div className="rounded-none shadow-xl lg:rounded-lg lg:block lg:border-4 lg:border-solid border-gray-500">
              <img className="rounded-none lg:rounded-t-sm lg:block w-full object-cover cursor-pointer" />
              <div className="p-2 flex flex-col justify-around items-center h-28">
                <div>
                  <h5 className="text-xl text-black font-semibold text-center">Loading...</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className=" grid grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-none shadow-xl lg:rounded-lg lg:block lg:border-4 lg:border-solid border-gray-500"
            >
              <img
                src={product.mainImg}
                className="rounded-none lg:rounded-t-sm lg:block w-full object-cover cursor-pointer"
              />
              <div className="p-2 flex flex-col justify-around items-center h-28">
                <div>
                  <h5 className="text-xl text-black font-semibold text-center">
                    {product.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
