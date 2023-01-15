import AddRounded from "@mui/icons-material/AddRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import React, { type Dispatch } from "react";
import { useFormContext } from "react-hook-form";
import type { FormFields } from "../components/Form/types";

interface FormSubmittedModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormSubmittedModal: React.FC<FormSubmittedModalProps> = ({
  open,
  setOpen
}) => {
  const {reset} = useFormContext<FormFields>()
  const router = useRouter();

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    handleModalClose();
    router.push("/");
  };

  const handleAddAnotherDive = () => {
    handleModalClose()
    reset()
  }

  return (
    <Modal
      aria-label="Form successfully submitted"
      aria-describedby="modal-description"
      open={open}
    >
      <ModalDialog>
        <Typography level="h4" component="p" id="modal-title" gutterBottom>
          Success
        </Typography>
        <Typography
          level="subtitle1"
          component="p"
          id="modal-description"
          mb={4}
        >
          Your dive has been saved! What'd you want to do next?
        </Typography>

        <Button
          color="success"
          fullWidth
          endDecorator={<ArrowForwardRounded />}
          size="lg"
          onClick={handleContinue}
          data-cy="New-FormSubmittedModal-continue"
        >
          Continue
        </Button>

        <Button
          color="neutral"
          variant="plain"
          fullWidth
          endDecorator={<AddRounded />}
          sx={{ mt: 2 }}
          onClick={handleAddAnotherDive}
        >
          Add another dive
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default FormSubmittedModal;
