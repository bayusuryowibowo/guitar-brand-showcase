import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../stores/actions/actionCreator";

export default function LandingPage() {
  const products = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

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
                  <span className=" text-lg text-black font-medium text-center">
                    $ {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
