import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../stores/actions/actionCreator";

export default function LoginPage() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginInput = (event) => {
    const value = event.target.value;
    const eventLoginInput = event.target.name;
    setFormLogin({ ...formLogin, [eventLoginInput]: value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(postLogin(formLogin));
      setFormLogin({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          onChange={onLoginInput}
          value={formLogin.email}
          type="email"
          name="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="bayu@mail.com"
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
          onChange={onLoginInput}
          value={formLogin.password}
          type="password"
          name="password"
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
  );
}
