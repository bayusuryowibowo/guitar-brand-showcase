import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../stores/actions/actionCreator";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  const handleClickDetailProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className=" p-3">
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
          <div className=" p-3 grid grid-cols-5 gap-y-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-none lg:block hover:border-2 hover:shadow-md border-b-2"
              >
                <img
                  onClick={() => handleClickDetailProduct(product.id)}
                  src={product.mainImg}
                  className="rounded-none block w-full object-cover cursor-pointer"
                />
                <div className="p-2 flex flex-col gap-1 justify-around items-center h-28">
                  <h5 className=" text-base text-black font-semibold text-center">
                    {product.name}
                  </h5>
                  <h6 id="price" className=" text-3xl font-bold text-center">
                    ${product.price}
                  </h6>
                </div>
                <div id="compare" className=" text-center w-full">
                <button id="button-compare" className=" text-xs font-semibold align-middle transition ease-in-out delay-150 duration-300">
                  COMPARE
                </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
