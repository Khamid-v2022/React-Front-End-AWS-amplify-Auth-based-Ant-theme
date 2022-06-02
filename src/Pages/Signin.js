import "../Styles/scss/pages.css";

import { Row, Col } from 'antd';
import Loginform from "../Components/Loginform";

function Signin() {
  return (
    <>
        <div className="page-title" align="center">Welcome back</div>
        <Row justify="center">
            <Col span={24} style={{ maxWidth: "400px" }}>
                <Loginform />
            </Col>
        </Row>
    </>
  );
}

export default Signin;