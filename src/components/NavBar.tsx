import { Link, Outlet, useLocation } from "react-router-dom";
import { CustomSplit } from "../modules/InfinteScroll/utils";

const NavBar = () => {
  // links for navigation bar items
  const Links = [
    { name: "Infinite Scroll", path: "" },
    { name: "Pagination", path: "pagination" },
    { name: "Analytics", path: "analytics" },
  ];
  // current pathname
  const { pathname } = useLocation();

  return (
    <>
      <nav>
        <ul className="flex items-center justify-center gap-8 my-5 ">
          {Links.map((link) => (
            <li
              key={link.name}
              className={`${
                link.path === CustomSplit(pathname, 1)
                  ? "text-blue-900 font-bold border-b-2 border-blue-900"
                  : ""
              }`}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* This is where child routes will be rendered */}
      <div className="mx-10">
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
