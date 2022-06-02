import "../Styles/scss/pages.css";
import { useState } from "react";

import { Auth } from "aws-amplify";
import { Formik } from "formik";
import * as Yup from "yup";

import { Row, Col } from "antd";

import { Card, Form, Input, Button, Checkbox, Alert } from "antd";
import { Link, useNavigate} from "react-router-dom";

// import ReCAPTCHA from "react-google-recaptcha";

function SignupForm() {
    let history = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [codeSubmitting, setCodeSubmitting] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");


    const handleSignup = async (values) => {
        setError(null);
        setSubmitting(true);

        try {
            await Auth.signUp(values.username, values.password);
            setUsername(values.username);
            setSignupSuccess(true);
        } catch (e) {
            setError(e);
            setSubmitting(false);
        }
    };
    
    const handleCode = async () => {
        setCodeSubmitting(true);
        try {
            let response = await Auth.confirmSignUp(username, code);
            if (response === "SUCCESS") {
                alert("for now, you must manually sign in again");
                history("/leaderboard");
            }  else {
                alert("That was not the right code");
            }
           
        }catch (e) {
            setError(e);
            setCodeSubmitting(false);
        }
    };

    if(signupSuccess){
        return (
            <div style={{maxWidth: "400px", marginLeft:"auto", marginRight:"auto"}}> 
                <Card title="Verify your account">
                    <Form.Item name="code" rules={[{ required: true, message: "Please input your code!" }]} >
                        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Please enter the code sent to the email address" />
                    </Form.Item>

                    { error && (<Alert message="Error" description={error.message} type="error" className="mb-3" /> )}
                    
                    <Form.Item className="mb-3">
                        <Button type="primary" onClick={handleCode} variant="contained" htmlType="button" className="login-form-button" disabled={codeSubmitting}>
                            Confirm Code
                        </Button>
                    </Form.Item>
                </Card>
                   
            </div>
          );
    }
    if (!signupSuccess){
        return (
            <>
                <Row>
                <Col sm={24} md={10} lg={8}>
                    <Card title="Sign Up">
                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string().email().required().min(3),
                                password: Yup.string().required().min(6),
                            })}
                            onSubmit={(values) => {
                                handleSignup(values);
                            }}
                        >
                            {({ errors, values, handleChange, handleBlur, handleSubmit, isValid }) => (
                            <Form name="normal_login" className="login-form"
                                initialValues={{
                                    remember: true,
                                }} onFinish={handleSubmit} >
                                <Form.Item name="email" rules={[  { required: true, message: "Please input your Email!", },]} >
                                    <Input placeholder="Email" value={values.username} onChange={handleChange("username")} />
                                </Form.Item>
                                <Form.Item name="password" rules={[ { required: true, message: "Please input your Password!"},]}>
                                    <Input type="password" placeholder="Password" value={values.password} onChange={handleChange("password")} onBlur={handleBlur("password")} />
                                </Form.Item>
                                
                                { error && (<Alert message="Error" description={error.message} type="error" className="mb-3" /> )}
                    
                                {/* <Form.Item>
                                <ReCAPTCHA sitekey="YOUR-SITE-KEY" onChange={onChange} />
                                </Form.Item> */}
                                
                                {/* <Form.Item name="accept" wrapperCol={{ span: 24 }} valuePropName="checked">
                                    <Checkbox>I accept Terms of Service</Checkbox>
                                </Form.Item> */}

                                <Form.Item className="mb-3">
                                    <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid || submitting}>
                                        Sign Up
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Link to="/signin">Log In</Link>
                                    <Link to="/termsofservice" className="login-form-forgot">
                                        Terms of Service
                                    </Link>
                                </Form.Item>
                            </Form>
                            )}
                        </Formik>
                    </Card>
                </Col>
                <Col md={14} lg={16}>
                    <div className="signup-img-back"></div>
                </Col>
                </Row>
            </>
        );
    }
}

export default SignupForm;
