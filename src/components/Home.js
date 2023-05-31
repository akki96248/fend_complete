import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

export default function Home({ showAlert, uId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState("");
  const [id, setId] = useState(null);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  async function deleteUser() {
    const body = { user_id: id, password: formData };
    fetch("http://localhost:2001/user/delete", {
      method: "POST",
      headers: {
        authorization: "yk11_",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          // Registration successful
          showAlert("User Deleted", "success");
          handleClose();
          getUser();
        } else {
          // Registration failed
          showAlert("Enter valid password", "danger", data.error);
        }
      });
  }

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await fetch("http://localhost:2001/user/listAll", {
        method: "POST",
        headers: { authorization: "yk11_", "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await response.json();
      setUserDetails(data.result.filter((d) => d._id !== uId));
    } catch (e) {}
  }

  return (
    <>
      <div>
        <h1>home</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">UpdateUser</th>
              <th scope="col">deleteUser</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((data) => (
              <tr key={data._id}>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>{data.mobile}</td>
                <td>
                  <Link className="icon" to="/update" state={data}>
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="icon"
                    onClick={() => {
                      handleShow();
                      setId(data._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <button onClick={getUser}>Get Users</button> */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Password"
                value={formData.data}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteUser();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
