import React from "react";

export default function UserDetails({ userData }) {
  return (
    <>
      <div>first_name: {userData.result.first_name}</div>
      <div>last_name: {userData.result.last_name}</div>
      <div>email: {userData.result.email}</div>
      <div>mobile: {userData.result.mobile}</div>
    </>
  );
}
