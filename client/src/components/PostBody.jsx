import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import UserImage from "../assets/user.png";
import moment from "moment";

const PostBody = ({
  post: { body, id, username, createdAt, likesCount, commentsCount },
}) => {
  console.log(likesCount, commentsCount);
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
          <Button as="div" labelPosition="right">
            <Button basic color="red">
              <Icon name="heart" />
            </Button>
            <Label as="a" basic color="red" pointing="left">
              {likesCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right">
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
