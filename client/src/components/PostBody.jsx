import { Link } from "react-router-dom";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import UserImage from "../assets/user.png";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import LikePost from "./LikePost";

const PostBody = ({
  post: {
    body,
    id,
    username,
    user: userId,
    createdAt,
    likesCount,
    likes,
    commentsCount,
  },
}) => {
  const history = useHistory();
  const context = useContext(AuthContext);

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image floated="right" size="mini" src={UserImage} />
          <Card.Header>{username}</Card.Header>
          <Card.Meta className="post-date" as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow()}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content textAlign="center">
          <LikePost likesCount={likesCount} likes={likes} id={id} />
          <Button
            as="div"
            labelPosition="right"
            onClick={() => history.push(`/posts/${id}`)}
          >
            <Button basic color="blue">
              <Icon name="comment" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentsCount}
            </Label>
          </Button>
          {context.user && context.user.id === userId && (
            <Button style={{ marginLeft: "20px" }} color="red">
              <Icon name="trash" />
            </Button>
          )}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default PostBody;
