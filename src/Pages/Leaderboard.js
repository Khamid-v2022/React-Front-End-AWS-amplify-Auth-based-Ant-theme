import "../Styles/scss/pages.css";
import { useContext } from "react";
import { UserContext } from "../Components/providers/UserProvider";

import { Row, Col, Card } from 'antd';
import ProfileAvatar from "../Components/ProfileAvatar";
import DataTable from "../Components/DataTable";
import React from "react";

function Leaderboard() {
    // const { user } = useContext(UserContext);
    const user = "My Name";
  return (
    <>
        <div className="page-title">Leaderboard</div>
        <Row gutter={8}>
            <Col md={6} sm={9} className="mb-2">
                <ProfileAvatar name={user} />
            </Col>
            <Col md={18} sm={15}>
                <Card className="datatable-wrapper">
                    <div className="deaderboard-table-wrapper">
                        <DataTable />
                    </div>
                </Card>
            </Col>
        </Row>
    </>
  );
}

export default Leaderboard;