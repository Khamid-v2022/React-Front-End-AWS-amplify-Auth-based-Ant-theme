import "../Styles/scss/pages.css";

import { Row, Col } from "antd";
import SignupForm from "../Components/SignupForm";

function Signup() {
  return (
    <>
      <div className="page-title" align="center">
        Join the world's last hedge fund.
      </div>
      <Row justify="center">
        <Col span={24} style={{ maxWidth: "900px" }}>
          <SignupForm />
        </Col>
      </Row>
    </>
  );
}

export default Signup;
