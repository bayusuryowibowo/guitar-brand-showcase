export default function Card({ product }) {
  return (
    <>
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
    </>
  );
}
