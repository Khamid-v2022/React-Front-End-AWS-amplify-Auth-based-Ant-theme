import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";

import UserProvider from "./Components/providers/UserProvider";
import ApolloProvider from "./Components/providers/ApolloProvider";
import UserAuthenticationProvider from "./Components/providers/UserAuthenticationProvider";

import "antd/dist/antd.min.css";
import "./Styles/scss/theme.css";

function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthenticationProvider>
          <ApolloProvider>
            <UserProvider>
              <Routes />
            </UserProvider>
          </ApolloProvider>
        </UserAuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
