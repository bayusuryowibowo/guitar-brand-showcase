import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function LoginPage() {
  const [formLogin, setFormLogin] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const navigate = useNavigate();

  const onLoginInput = (event) => {
    const value = event.target.value;
    const eventLoginInput = event.target.name;
    setFormLogin({ ...formLogin, [eventLoginInput]: value });
  };

  const getLogin = async () => {
    try {
      const response = await fetch(baseUrl + "/login", {
        method: "POST",
        body: formLogin
      });
      if (response.ok) {
        const data = await response.json();
        const user = data.find(
          (user) =>
            user.email === formLogin.loginEmail &&
            user.password === formLogin.loginPassword
        );
        if (!user) throw new Error("InvalidLogin");
        console.log(response, "<<<< login")
        localStorage.access_token = 
        setFormLogin({
          loginEmail: "",
          loginPassword: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getLogin();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 p-8 w-1/2 mx-auto rounded-lg border-4 shadow-xl"
    >
      <div className="mb-6">
        <label
          htmlFor="loginEmail"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          onChange={onLoginInput}
          value={formLogin.loginEmail}
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
          value={formLogin.loginPassword}
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
  );
}
