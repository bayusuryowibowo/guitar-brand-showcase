import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("access_token");
    setIsLogin(false);
    navigate("/login");
  };

  const watchLocalStorage = () => {
    if (localStorage.access_token) setIsLogin(true);
    else setIsLogin(false);
  };

  useEffect(() => {
    watchLocalStorage();
  }, []);

  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!isLogin && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            {isLogin && (
              <li>
                <a onClick={handleLogout} className=" cursor-pointer">
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
