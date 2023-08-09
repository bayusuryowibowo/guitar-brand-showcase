import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center fixed w-full z-20 top-0 left-0 bg-blue-500 shadow-md border-b border-gray-400 dark:border-slate-500">
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
