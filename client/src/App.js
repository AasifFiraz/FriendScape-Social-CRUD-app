import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import Navbar from "./components/Navbar";
import SinglePost from "./components/SinglePost";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <Container>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <AuthRoute exact path="/login">
              <LoginPage />
            </AuthRoute>
            <AuthRoute exact path="/register">
              <RegisterPage />
            </AuthRoute>
            <AuthRoute exact path="/posts/:id">
              <SinglePost />
            </AuthRoute>
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </Container>
  );
}

export default App;
