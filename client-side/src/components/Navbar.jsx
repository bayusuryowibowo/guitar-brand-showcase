import "./Navbar.css";

export default function Navbar() {
  return (
    <header id="navbar" className="flex mx-auto border-b-2">
      <a href="#" id="logo" className="flex items-center h-full ">
        <img
          width="190"
          height="41"
          src="https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=190&amp;quality=90&amp;ha=9fec6b575dbcf9ae"
          srcSet="
                https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=159&amp;quality=90&amp;ha=9fec6b575dbcf9ae 159w,
                https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=190&amp;quality=90&amp;ha=9fec6b575dbcf9ae 190w,
                https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=304&amp;quality=58&amp;ha=9fec6b575dbcf9ae 304w,
                https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=380&amp;quality=58&amp;ha=9fec6b575dbcf9ae 380w,
                https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=477&amp;quality=40&amp;ha=9fec6b575dbcf9ae 477w,
                https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=570&amp;quality=40&amp;ha=9fec6b575dbcf9ae 570w"
          sizes="(min-width: 568px) 190px, 159px"
          alt="Sweetwater®"
        ></img>
      </a>
      <div id="search-input" className="flex md:order-2 items-center mx-4">
        <button
          type="button"
          className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div className="relative w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
