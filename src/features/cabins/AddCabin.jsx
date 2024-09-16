import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal((isOpenModal) => !isOpenModal);
  };
  return (
    <div>
      <Button onClick={handleCloseModal}>
        {isOpenModal ? "Show Less" : "Add New Cabin"}
      </Button>
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <CreateCabinForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
