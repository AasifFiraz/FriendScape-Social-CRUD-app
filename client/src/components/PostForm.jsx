import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Form, Transition } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { CREATE_POST } from "../graphql/Mutation";
import { GET_POSTS } from "../graphql/Query";

const PostForm = () => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState();
  const { handleSubmit, onChange, values } = useForm(addPost, {
    body: "",
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
    },
    refetchQueries: [{ query: GET_POSTS }, "getPosts"],
    variables: { body: values.postBody },
    onError(error) {
      setErrors(error.message);
    },
  });

  function addPost() {
    createPost();
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ marginTop: "10px" }}>Create a post</h2>
        <Form.Input
          fluid
          onChange={onChange}
          name="postBody"
          value={values.postBody}
          error={errors ? true : false}
          placeholder={`Hey my name is ${user.username} :)`}
        />
        <Form.Button loading={loading ? true : false} color="orange" inverted>
          Post
        </Form.Button>
      </Form>
      {errors && (
        <div className="ui error message" style={{marginBottom: '20px'}}>
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostForm;
