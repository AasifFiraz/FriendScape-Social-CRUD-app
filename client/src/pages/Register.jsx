import { useMutation } from "@apollo/client";
import { Form } from "semantic-ui-react";
import { REGISTER } from "../graphql/Mutation";
import { useHistory } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";

const RegisterPage = () => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, handleSubmit, values } = useForm(addUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER, {
    variables: values,
    update(_, result) {
      context.login(result.data.login);
      history.push("/");
      Object.keys(values).forEach((i) => (values[i] = ""));
    },
    onError(error) {
      if (typeof error.message === "string") {
        console.log("its a string");
        setErrors(error.message);
      }
      setErrors(JSON.parse(error.message));
    },
  });

  function addUser() {
    registerUser();
  }

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="form-container">
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          fluid
          label="Username"
          name="username"
          value={values.username}
          type="text"
          onChange={onChange}
          placeholder="Username"
          error={errors.username ? true : false}
        />
        <Form.Input
          fluid
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          placeholder="Email"
          error={errors.email ? true : false}
        />
        <Form.Input
          fluid
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          placeholder="Password"
          error={errors.password ? true : false}
        />
        <Form.Input
          fluid
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          placeholder="Confirm Password"
          error={errors.confirmPassword ? true : false}
        />
        <Form.Button primary>Register</Form.Button>
      </Form>
      {Object.keys(errors).length > 0 &&
        (typeof errors === "object" ? (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="ui error message">
            <ul className="list">
              <li>{errors}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default RegisterPage;
