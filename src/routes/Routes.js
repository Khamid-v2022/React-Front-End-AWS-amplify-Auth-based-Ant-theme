import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { UserAuthenticationContext } from "../Components/providers/UserAuthenticationProvider";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Dashboard from '../Pages/Dashboard';
import Signin from '../Pages/Signin';
import Signup from '../Pages/Signup';
import Leaderboard from '../Pages/Leaderboard';
import Profile from '../Pages/Profile';
import TermsOfService from '../Pages/TermsOfService';
import ForgotPassword from '../Pages/ForgotPassword';

import Footer from '../Components/Footer';

import { Layout, Menu } from 'antd';
const { Header, Content} = Layout;

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

const menu_items = [
    { label:<Link to="/"><div className="logo"><img src="/assets/images/brand-logo.png" className="brand-logo" alt="brand"></img></div></Link>, key:'logo' },
    { label:<Link to="/">Dashboard</Link>, key:'dashboard' },
    { label:<Link to="/leaderboard">Leaderboard</Link>, key:'leaderboard' },
    {
      label: 'Account',
      key: 'submenu',
      children: [
        { label:<Link to="/profile">Profile</Link>, key:'profile' },
        { label:<Link to="/setting">Setting</Link>, key:'setting' },
        { label:<a onClick={logout} className="sidebar-link">Sign out</a>, key:'signout' },
      ]
    }
]
  
const Navbar = () => {
    return (
      <>
        <Header>
          <Menu theme="dark"  defaultSelectedKeys={['home']} mode="horizontal" items={menu_items} />
        </Header>
      </>
    );
};

const MyRoutes = () => {
    const { isLoggedIn, isLoggingIn } = useContext(UserAuthenticationContext);

    return (
      <Layout>
        {!isLoggedIn && !isLoggingIn ? <></> : <Navbar />}
        <Content className="site-layout container">
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/" element={<PublicRoute />}>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
            </Route>
          </Routes>
        </Content>
        <Footer />
      </Layout>
    );
};

export default MyRoutes;
