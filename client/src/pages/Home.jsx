import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/Query";
import { Grid, Transition } from "semantic-ui-react";
import PostBody from "../components/PostBody";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { user } = useContext(AuthContext);
  if (error) return `Error! ${error.message}`;

  return (
    <Grid columns={3} divided>
      <Grid.Row centered>
        <h1 style={{ marginTop: "10px" }}>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group animation="swing up" duration={700}>
          {loading ? (
            <h1>Loading Posts ....</h1>
          ) : data.getPosts ? (
            data.getPosts.map((post) => {
              return (
                <Grid.Column
                  key={post.id}
                  style={{ marginBottom: "30px", boxShadow: "none" }}
                >
                  <PostBody post={post} />
                </Grid.Column>
              );
            })
          ) : (
            <h1>No Posts to display</h1>
          )}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default HomePage;
