import { Link, useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";

const Navbar = ({ userData, setUserData }) => {
  const Navigate = useNavigate();
  const logout = () => {
    setUserData(null);
    localStorage.removeItem("token");

    if (localStorage.removeItem) {
      Navigate("/login"); // Redirect to login page
    }
  };

  const AppContext = createContext();

  const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
      <AppContext.Provider value={{ user, setUser }}>
        {children}
      </AppContext.Provider>
    );
  };

  const MyComponent = () => {
    const { user, setUser } = useContext(AppContext);
  };

  return (
    <AppContextProvider>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              {userData ? (
                <Link className="btn btn-primary mx-1" to="/user" role="button">
                  {userData.result.first_name}
                </Link>
              ) : (
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  singup
                </Link>
              )}
              {userData ? (
                <button className="btn btn-primary mx-1" onClick={logout}>
                  Logout
                </button>
              ) : (
                <Link
                  className="btn btn-primary mx-1"
                  to="/Login"
                  role="button"
                >
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </AppContextProvider>
  );
};
export default Navbar;
