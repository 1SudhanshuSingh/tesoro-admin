import React, { ReactNode } from "react";
import { Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface LargeModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const LargeModal: React.FC<LargeModalProps> = ({
  open,
  title,
  children,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="large-modal-title"
      aria-describedby="large-modal-description"
      closeAfterTransition
    >
      <>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "90%",
            margin: "0 5%",
            bgcolor: "background.paper",
            boxShadow: 24,
            height: "100vh",
            p: "1rem",
          }}
        >
          <h3 id="large-modal-title">{title}</h3>
          {children}
        </Box>
      </>
    </Modal>
  );
};

export default LargeModal;
