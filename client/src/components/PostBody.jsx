import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import UserImage from "../assets/user.png";
import moment from "moment";
import { LIKE_POST } from "../graphql/Mutation"

const PostBody = ({
  post: { body, id, username, createdAt, likesCount, commentsCount },
}) => {
  const [addLike, {data, loading, error}] = useMutation(LIKE_POST);

  const likePost = () => {
    addLike({ variables: { PostId: id } })
    console.log(data, loading, error)
  }

  const commentOnPost = () => {
    console.log("Comment Post")
  }

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image floated="right" size="mini" src={UserImage} />
          <Card.Header>{username}</Card.Header>
          <Card.Meta className="post-date" as={Link} to={`/posts/${id}`}>
            {moment(createdAt).startOf("hour").fromNow()}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Button as="div" labelPosition="right" onClick={likePost}>
            <Button basic color="red">
              <Icon name="heart" />
            </Button>
            <Label as="a" basic color="red" pointing="left">
              {likesCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" onClick={commentOnPost}>
            <Button basic color="blue">
              <Icon name="comment" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentsCount}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default PostBody;
