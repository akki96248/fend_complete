import React, { useState, useEffect, useReducer } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Navigate,
} from "react-router-dom";
import UserDetails from "./components/UserDetails";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Singup from "./components/Singup";
import Update from "./components/Update";
import Login from "./components/Login";
import Alert from "./components/Alert";
import Home from "./components/Home";
import UserState from "./context/UserState";

function App() {
  const [alert, setAlert] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }

    const tempToken = localStorage.getItem("token");
    if (token || tempToken) {
      fetch("http://localhost:2001/user_details/token", {
        method: "POST",
        headers: {
          authorization: "yk11_",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token || tempToken }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.success) {
            setUserData(data);
          } else {
            localStorage.removeItem("token");
          }
        });
    }
  }, [token]);
  return (
    <>
    <UserState>
    <BrowserRouter>
      <Navbar userData={userData} setUserData={setUserData} />
      <Alert alert={alert} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            userData ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/home"
          element={
            userData ? (
              <Home showAlert={showAlert} uId={userData.result._id} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/about"
          element={userData ? <About /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/signup"
          element={
            userData ? (
              <Navigate to="/home" />
            ) : (
              <Singup showAlert={showAlert} />
            )
          }
        />
        <Route
          exact
          path="/user"
          element={
            userData ? (
              <UserDetails
                userData={userData}
                showAlert={showAlert}
                setUserData={setUserData}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/update"
          element={
            userData ? (
              <Update
                setUserData={setUserData}
                showAlert={showAlert}
                setToken={setToken}
                userData={userData}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          exact
          path="/login"
          element={
            userData ? (
              <Navigate to="/home" />
            ) : (
              <Login showAlert={showAlert} setToken={setToken} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
    </UserState>
    </>
  );
}

export default App;
