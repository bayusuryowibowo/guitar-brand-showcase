import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRegister } from "../stores/actions/actionCreator";

export default function RegisterPage() {
  const [formRegister, setFormRegister] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const onRegisterInput = (event) => {
    const value = event.target.value;
    const eventRegisterInput = event.target.name;
    setFormRegister({ ...formRegister, [eventRegisterInput]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(postRegister(formRegister));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-10 p-8 w-1/2 mx-auto rounded-lg border-4 shadow-xl"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.email}
            type="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="bayu@mail.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.username}
            type="text"
            name="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.password}
            type="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="must be at least 5 characters"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your Phone Number
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.phoneNumber}
            type="phoneNumber"
            name="phoneNumber"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your Address
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.address}
            type="address"
            name="address"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
    </>
  );
}
