import { useState } from "react";
import Card from "./components/Card";
import useFetch from "./hooks/useFetch";

function App() {
  const [formLogin, setFormLogin] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [formRegister, setFormRegister] = useState({
    registerEmail: "",
    registerPassword: "",
  });
  const { data: products, isLoading } = useFetch("/products");

  const onRegisterInput = (event) => {
    const value = event.target.value;
    const eventRegisterInput = event.target.name;
    setFormRegister({ ...formRegister, [eventRegisterInput]: value });
  };

  const onLoginInput = (event) => {
    const value = event.target.value;
    const eventLoginInput = event.target.name;
    setFormLogin({ ...formLogin, [eventLoginInput]: value });
  };

  return (
    <>
      <form className="mt-10 p-8 w-1/2 mx-auto rounded-lg border-4 shadow-xl">
        <div className="mb-6">
          <label
            htmlFor="registerEmail"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            onChange={onRegisterInput}
            type="email"
            name="registerEmail"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="bayu@mail.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="registerPassword"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            onChange={onRegisterInput}
            type="password"
            name="registerPassword"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="must be at least 5 characters"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register
          </button>
        </div>
      </form>
      <form className="mt-10 p-8 w-1/2 mx-auto rounded-lg border-4 shadow-xl">
        <div className="mb-6">
          <label
            htmlFor="loginEmail"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            onChange={onLoginInput}
            type="email"
            name="loginEmail"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="bayu@mail.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="loginPassword"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            onChange={onLoginInput}
            type="password"
            name="loginPassword"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="must be at least 5 characters"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
      </form>
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

export default App;
