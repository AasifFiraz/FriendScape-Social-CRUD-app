import React, { useEffect, useContext, useState } from "react";
import { Button, Modal, Icon, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../graphql/Mutation";
import { GET_POSTS } from "../graphql/Query";

const LikePost = ({ id, likesCount, likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [addLike, { loading }] = useMutation(LIKE_POST, {
    variables: { postId: id },
    refetchQueries: [{ query: GET_POSTS }, "getPosts"],
    update(_, result) {
      console.log(result);
    },
  });

  const likePost = () => {
    if (user) {
      addLike();
      setIsLiked(!isLiked);
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (user && likes.find((like) => like.user === user.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user]);

  return modalOpen ? (
    <Modal
      size="tiny"
      dimmer="blurring"
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
    >
      <Modal.Header>Not Logged In</Modal.Header>
      <Modal.Content>You have to be logged in to like the post</Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button
          positive
          onClick={() => {
            history.push("/login");
            setModalOpen(false);
          }}
        >
          Login
        </Button>
      </Modal.Actions>
    </Modal>
  ) : (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button basic={isLiked ? false : true} loading={loading} color="red">
        <Icon name="heart" />
      </Button>
      <Label as="a" basic color="red" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
};

export default LikePost;
