import React, { useState } from "react";
import { Container, Card, Button, Form, Row } from "react-bootstrap";
import "./styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "./axiosInstance";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(2)
    .max(24),
  lastName: yup.string().required("Please enter your last name").min(2).max(24),
  phoneNumber: yup.number().required("Please enter digits only"),
  email: yup.string().email().required("Email is invalid"),
  securityQuestion: yup.string().required("Please answer security question"),
  password: yup
    .string()
    .min(
      6,
      "Passwords must be at least 6 characters, and contain one special character"
    )
    .max(24)
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .required("Type your password again")
    .oneOf([yup.ref("password")], "Passwords must match")
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [resStatus, setResStatus] = useState("");

  const onSubmitHandler = (data) => {
    axios
      .post("/api/user", data)
      .then(function (response) {
        console.log(response.status);
        if (response.status === 200) {
          setResStatus("Successful Registration!");
        } else {
          setResStatus("error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(resStatus);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Card className="registerCardPage">
            <Card.Header as="h5" className="registerCardHeader">
              Register for an Account
            </Card.Header>
            <Card.Body>
              {/* First Name */}
              <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <input
                    {...register("firstName")}
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                </Form.Group>

                {/* Last Name */}
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <input
                    {...register("lastName")}
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.lastName?.message}
                  </div>
                </Form.Group>
                {/* Phone Number */}
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <input
                    {...register("phoneNumber")}
                    type="text"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.phoneNumber?.message}
                  </div>
                </Form.Group>

                {/* Email Address */}
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <input
                    {...register("email")}
                    type="text"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </Form.Group>

                {/* Security Question */}
                <Form.Group>
                  <Form.Label>
                    Where is your favorite place to vacation?
                  </Form.Label>
                  <input
                    {...register("securityQuestion")}
                    type="text"
                    className={`form-control ${
                      errors.securityQuestion ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.securityQuestion?.message}
                  </div>
                </Form.Group>

                {/* Password */}
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <input
                    {...register("password")}
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </Form.Group>
                {/* Confirm Password */}
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </Form.Group>

                <Button className="registerButton" type="submit">
                  Register
                </Button>
                <div>
                  Status:
                  <p id="status">{resStatus}</p>
                </div>
              </Form>
              <Card.Text id="linkText">
                Already have an account? Click
                <a href="Login" className="aLink">
                  Here
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Register;
