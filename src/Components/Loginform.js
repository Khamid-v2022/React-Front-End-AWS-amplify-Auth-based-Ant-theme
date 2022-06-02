import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Alert } from "antd";

import { Auth } from "aws-amplify";
import { Formik } from "formik";
import * as Yup from "yup";


import "../Styles/scss/pages.css";

function Loginform() {
  let history = useNavigate();
  
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async values => {
    setError(null);
    setSubmitting(true);

    let response = null;
    try {
        response = await Auth.signIn(values.username, values.password);

        if (response?.challengeName === "NEW_PASSWORD_REQUIRED") {
            // setChangePassword(response);
            console.log("NEW_PASSWORD_REQUIRED")
        } else {
            history("/leaderboard");
        }
    } catch (e) {
        setError(e);
        setSubmitting(false);
        // if (e.code === "PasswordResetRequiredException") setResetPassword(values.username);
        console.log("Set resest password")
    }
  };


  return (
    <>
    <Card title="Log In">
      <Formik
            initialValues={{
                username: "",
                password: ""
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .email()
                    .required()
                    .min(3),
                password: Yup.string()
                    .required()
                    .min(6)
            })}
            onSubmit={values => {
                handleLogin(values);
            }}
        >
          {({ errors, values, handleChange, handleBlur, handleSubmit, isValid }) => (
              <Form name="normal_login" className="login-form"  onFinish={handleSubmit}>
                <Form.Item name="email" value={values.username} onChange={handleChange("username")}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}>
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" value={values.password} onChange={handleChange("password")} onBlur={handleBlur("password")}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}>
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                { error && (<Alert message="Error" description={error.message} type="error" className="mb-3" /> )}


                <Form.Item  className="mb-3">
                  <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid || submitting} >
                    Log in
                  </Button>
                </Form.Item>
                
                <Form.Item>
                  <Link to="/signup">
                      Sign Up
                  </Link>
                  <Link to="/forgot_password" className="login-form-forgot">
                      Forgot password
                  </Link>
                </Form.Item>
              </Form>
            
          )}
        </Formik>
      </Card>
    </>
  );
}

export default Loginform;
