import "../Styles/scss/pages.css";
import { useLocation } from 'react-router-dom';

import { Row, Col, Card } from 'antd';

import ProfileAvatar from "../Components/ProfileAvatar";
import CustomChart from "../Components/CustomChart";

function Cart(props) {
    return (
      <Card title={props.title} align="center">
        <div>
          <span className="text-muted" style={{ fontSize: ".8rem" }}>
            {props.description}
          </span>
          <h1>{props.price}</h1>
        </div>
      </Card>
    );
}

function Profile() {
    const location = useLocation();
    let userId = 1; //my-id from cookie
    let userName = "My Name";
    if(location.state){
        userId = location.state.id;
        // fetch user Info from API
        userName = location.state.name;
    }
  return (
    <>
        <div className="page-title">Profile</div>
        <Row gutter={8}>
            <Col md={6} sm={9} className="mb-2">
                <ProfileAvatar name={userName} />
            </Col>
            <Col md={18} sm={15}>
                <Row gutter={8}>
                    <Col lg={8} className="mb-2">
                        <Cart title="Correlation Rank" description="By Correlation Reputation" price="4,683" />
                    </Col>
                    <Col lg={8} className="mb-2">
                        <Cart title="Total NMR Staked" description="~$9,745,640.89" price="785,939 NMR" />
                    </Col>
                    <Col lg={8} className="mb-2">
                        <Cart title="Avg 3 Month Return" description="on NMR staked" price="11.69 %" />
                    </Col>
                </Row>
                <Card title="Performance">
                    Correlation between this model's predictions and the true targets.
                    <div style={{marginTop: "20px"}}>
                        <CustomChart />
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <CustomChart />
                    </div>
                </Card>
            </Col>
        </Row>
    </>
  );
}

export default Profile;