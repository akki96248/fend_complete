import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const About = () => {
  const userContext = useContext(UserContext);
  const { users } = userContext;

  return(
    <div><p>This is About {users}</p>  </div>

  );
};

export default About;
