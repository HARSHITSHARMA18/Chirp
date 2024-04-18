import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  console.log(authStatus);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Explore",
      slug: "/explore",
      active: authStatus,
    },
    {
      name: "Add Chirp",
      slug: "/add-chirp",
      active: authStatus,
    },
    // {
    //   name: "Logout",
    //   slug: "/logout",
    //   active: authStatus,
    // },
  ];

  return (
    <header className="py-3 shadow bg-[#292929] border-b-2 rounded-lg">
      <Container>
        <nav className="flex drop-shadow-xl ">
          <div className="mr-1">
            <Link to="/">
              <Logo width={"10%"} />
            </Link>
          </div>

          {/* Displaying navItems when logged in */}
          <ul className="flex ml-auto items-center justify-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={`${item.slug}`}
                    className={({ isActive }) =>
                      `font-medium mr-1.5 sm:mr-5 p-1 text-[13px] whitespace-nowrap md:text-[20px] ${
                        isActive
                          ? "text-[#B500FF] border-b-2 rounded-md  transition-all duration-100"
                          : "text-white/65 hover:text-[#B500FF] "
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {authStatus && (
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `font-medium mr-1.5 sm:mr-5 p-1 text-[13px] whitespace-nowrap md:text-[18px] ${
                    isActive
                      ? "text-white/90 border-b  transition-all duration-300"
                      : "text-white/65 hover:text-white/90 "
                  }`
                }
              >
                <LogoutBtn />
              </NavLink>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
