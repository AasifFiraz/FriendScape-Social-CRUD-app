import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GET_POST } from "../graphql/Query";
import { CREATE_COMMENT } from "../graphql/Mutation";
import {
  Grid,
  Image,
  Segment,
  Card,
  Button,
  Icon,
  Label,
  Comment,
  Header,
  Form,
} from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import UserImage from "../assets/user.png";
import moment from "moment";
import LikePost from "./LikePost";
import DeleteButton from "./DeleteButon";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const SinglePost = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams();

  const { handleSubmit, onChange, values } = useForm(addComment, {
    body: "",
  });

  const { data, loading } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  const [createComment, createComentInfo] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, body: values.body },
    update() {
      values.body = "";
    },
    refetchQueries: [{ query: GET_POST, variables: { postId: id } }, "getPost"],
  });

  function addComment() {
    createComment();
  }

  const deletePostCallback = () => {
    history.push("/");
  };

  const generatePostBody = () => {
    if (loading) {
      return <h3>Loading post...</h3>;
    } else if (data) {
      const {
        id,
        username,
        body,
        createdAt,
        likesCount,
        commentsCount,
        user: userId,
        comments,
        likes,
      } = data.getPost;
      return (
        <Grid centered style={{ marginTop: "30px" }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Segment placeholder>
                <Image
                  style={{ marginLeft: "30px" }}
                  size="small"
                  src={UserImage}
                />
              </Segment>
              {user && (
                <Form onSubmit={handleSubmit}>
                  <Form.TextArea
                    name="body"
                    value={values.body}
                    onChange={onChange}
                    placeholder="Look Mom, I can comment :)"
                  />
                  <Form.Button
                    loading={createComentInfo.loading}
                    type="submit"
                    content="Enter Comment"
                    labelPosition="left"
                    icon="comment"
                    primary
                  />
                </Form>
              )}
            </Grid.Column>
            <Grid.Column width={5}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <LikePost id={id} likes={likes} likesCount={likesCount} />
                  <Button
                    as="div"
                    labelPosition="right"
                    // onClick={() => history.push(`/posts/${id}`)}
                  >
                    <Button basic color="blue">
                      <Icon name="comment" />
                    </Button>
                    <Label as="a" basic color="blue" pointing="left">
                      {commentsCount}
                    </Label>
                  </Button>
                  {user && user.id === userId && (
                    <DeleteButton id={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
              {comments.length > 0 && (
                <div>
                  <Grid.Column style={{ marginTop: "30px" }}>
                    <Comment.Group>
                      <Header as="h3" dividing>
                        Comments
                      </Header>
                      {comments.map((comment) => (
                        <Comment>
                          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                          <Comment.Content>
                            <Comment.Author as="a">
                              {comment.username}
                            </Comment.Author>
                            <Comment.Metadata>
                              {moment(comment.createdAt).fromNow()}
                            </Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action>Reply</Comment.Action>
                              <Icon
                                color="red"
                                name="trash"
                                style={{ cursor: "pointer" }}
                                onClick={() => console.log("Deleted", comment.id)}
                              />
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      ))}
                    </Comment.Group>
                  </Grid.Column>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <h3>
          An error occured when displaying the post, Please check the console
        </h3>
      );
    }
  };

  return generatePostBody();
};

export default SinglePost;
