import { useState } from "react";

const baseUrl = "http://localhost:3000";

export default function RegisterPage() {
  const [formRegister, setFormRegister] = useState({
    registerEmail: "",
    registerUsername: "",
    registerPassword: "",
    registerRole: "Admin"
  });

  const onRegisterInput = (event) => {
    const value = event.target.value;
    const eventRegisterInput = event.target.name;
    setFormRegister({ ...formRegister, [eventRegisterInput]: value });
  };

  const postRegister = async () => {
    try {
      await fetch(baseUrl + "/users", {
        method: "POST",
        body: JSON.stringify(formRegister),
        headers: {
          "Content-Type": "application/json",
        },
      })
      setFormRegister({
        registerEmail: "",
        registerUsername: "",
        registerPassword: "",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postRegister()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10 p-8 w-1/2 mx-auto rounded-lg border-4 shadow-xl">
        <div className="mb-6">
          <label
            htmlFor="registerEmail"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.registerEmail}
            type="email"
            name="registerEmail"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="bayu@mail.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="registerUsername"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            onChange={onRegisterInput}
            value={formRegister.registerUsername}
            type="text"
            name="registerUsername"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
            value={formRegister.registerPassword}
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
    </>
  );
}
