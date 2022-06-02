import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Row, Col, Alert } from "antd";
import { Auth } from "aws-amplify";

import "../Styles/scss/pages.css";

function ForgotPassword() {
  let history = useNavigate();

  const [codeSubmitting, setCodeSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [email, setEmail] = useState(null);

  const onFinishResetPass = async (values) => {
    setResetSubmitting(true);
    setError(null);
    try {
      let response = await Auth.forgotPasswordSubmit(email, values.code, values.password);
      if (response === "SUCCESS") {
          alert("for now, you must manually sign in again");
          history("/leaderboard");
      }  else {
          alert("That was not the right code");
      }
    }catch (e) {
        setError(e);
        setResetSubmitting(false);
    }
  }

  const onFinish = async (values) => {
    setCodeSubmitting(true);
    setError(null);

    try { 
      await Auth.forgotPassword(values.email);
      setCodeSuccess(true);
      setEmail(values.email);
    }catch (e) {
        setError(e);
        setCodeSubmitting(false);
    }
    // Auth.forgotPassword(values.email)
    // .then(data => console.log(data))
    // .catch(err => console.log(err));
  };
  if(codeSuccess){
    return (
      <>
        <Row justify="center">
          <Col span={24} style={{ maxWidth: "400px", paddingTop:"50px" }}>
            <Card title="Reset Password">
              <Form name="normal_login" className="login-form" onFinish={onFinishResetPass} >
                <Form.Item name="code" rules={[ { required: true, message: "Please input the code from your email!",}, ]} >
                  <Input placeholder="Code" />
                </Form.Item>
                <Form.Item name="password" rules={[ { required: true, message: "Please input New Password!"},]}>
                    <Input type="password" placeholder="Password" />
                </Form.Item>

                { error && (<Alert message="Error" description={error.message} type="error" className="mb-3" /> )}

                <Form.Item className="mb-3">
                  <Button type="primary" htmlType="submit" className="login-form-button"  disabled={resetSubmitting}>
                    Reset Password
                  </Button>
                </Form.Item>
                { error && (<Alert message="Error" description={error.message} type="error" className="mb-3" /> )}
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    );
  }else{
    return (
      <>
        <Row justify="center">
          <Col span={24} style={{ maxWidth: "400px", paddingTop:"50px" }}>
            <Card title="Confirm your email">
              <Form name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish} >
                <Form.Item name="email" rules={[ { required: true,message: "Please input your Email!",}, ]} >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item className="mb-3">
                  <Button type="primary" htmlType="submit" className="login-form-button"  disabled={codeSubmitting}>
                    Send Code
                  </Button>
                </Form.Item>
                { error && (<Alert message="Error" description={error.message} type="error" className="mb-3" /> )}
                      
                <Form.Item>
                  <Link to="/signin">Log In</Link>
                  <Link to="/signup" className="login-form-forgot">
                      Sign Up
                  </Link>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default ForgotPassword;
