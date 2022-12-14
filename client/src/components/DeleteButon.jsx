import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { GET_POSTS } from "../graphql/Query";
import { DELETE_POST } from "../graphql/Mutation";
import ConfirmModal from "./ConfirmModal";

const DeleteButton = ({ id, callback }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    variables: { postId: id },
    update() {
      if(callback) {
        callback();
      }
    },
    refetchQueries: [{ query: GET_POSTS }, "getPosts"],
  });

  const handleDelete = () => {
    setModalOpen(true)
  };

  return modalOpen ? (
    <ConfirmModal
      heading="Delete Post"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      body="Are you sure you want to delete this post"
      confirmName="Delete"
      onConfirm={() => {
        deletePost()
      }}
    />
  ): (
    <Button
      loading={loading}
      style={{ float: "right", width: '50px' }}
      color="red"
      onClick={handleDelete}
    >
      <Icon name="trash" />
    </Button>
  );
};

export default DeleteButton;
