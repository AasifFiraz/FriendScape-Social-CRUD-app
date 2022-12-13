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


function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/posts/:id">
            <SinglePost />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
