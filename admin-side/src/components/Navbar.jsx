import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
