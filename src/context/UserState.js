import React, { useState } from "react";
import UserContext from "./UserContext";

export default function UserState(props) {
  const [users, setUsers] = useState([]);

  const adduser = (first_name, last_name, email, mobile, password) => {
   
    const newUser = { first_name, last_name, email, mobile, password };
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <UserContext.Provider value={{ adduser,users }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
}
