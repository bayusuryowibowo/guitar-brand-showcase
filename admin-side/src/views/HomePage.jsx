import useFetch from "../hooks/useFetch";
import Card from "../components/Card";

export default function HomePage() {
  const { data: products, isLoading } = useFetch("/products");

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
            <Card product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
