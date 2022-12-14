import React, { useEffect, useContext, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../graphql/Mutation";
import { GET_POSTS } from "../graphql/Query";
import ConfirmModal from "./ConfirmModal";

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
  }, [likes, user]);

  return modalOpen ? (
    <ConfirmModal
      heading="Not Logged In"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      body="You have to be logged in to like the post"
      confirmName="Login"
      onConfirm={() => {
        history.push("/login");
      }}
    />
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
