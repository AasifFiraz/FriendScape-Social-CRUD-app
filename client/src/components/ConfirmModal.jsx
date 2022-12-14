import { Modal, Button } from "semantic-ui-react";

const ConfirmModal = ({
  heading,
  body,
  confirmName,
  onConfirm,
  modalOpen,
  setModalOpen,
}) => {
  return (
    <Modal
      size="tiny"
      dimmer="blurring"
      open={modalOpen}
      onOpen={() => setModalOpen(true)}
      onClose={() => setModalOpen(false)}
    >
      <Modal.Header>{heading}</Modal.Header>
      <Modal.Content>{body}</Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button positive onClick={() => {
            onConfirm()
            setModalOpen(false)
        }}>
          {confirmName}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;
