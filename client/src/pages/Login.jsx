import { useMutation } from "@apollo/client";
import { Form } from "semantic-ui-react";
import { LOGIN } from "../graphql/Mutation";
import { useHistory } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { useState } from "react";

const LoginPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { onChange, handleSubmit, values } = useForm(addUser, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN, {
    variables: values,
    update(_, result) {
      console.log(result);
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
    loginUser();
  }

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="form-container">
      <Form onSubmit={handleSubmit} noValidate style={{ marginTop: "50px" }}>
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
        <Form.Button primary>Login</Form.Button>
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
            <p>{errors}</p>
          </div>
        ))}
    </div>
  );
};

export default LoginPage;
