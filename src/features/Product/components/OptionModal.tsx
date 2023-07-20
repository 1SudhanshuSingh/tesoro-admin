import { Grid, TextField, Button } from "@mui/material";
import { LargeModal, OptionList } from "../../../components";
import AssociatedOptions from "../../components/AssociateOptions";
import GloballyAvailableOptions from "../../components/GlobalOptions";
import CreateNewOptions from "../../components/CreateNewOption";
import React, { useState, useEffect } from "react";
import useCreateMasterOption from "../../../hooks/Filter/useCreateMasterOption";
interface OptionalModalProps {
  show: boolean;
  data: Array<{
    id: number;
    label: string;
  }>;
  handleShow: (show: boolean) => void;
  handleBackToFilter: (show: boolean) => void;
  handleCreateOption: (OptionName: string) => void;
  setAssociatedFiltrOption: (id: number) => void;
}

const OptionModal: React.FC<OptionalModalProps> = ({
  show,
  data,
  handleShow,
  handleBackToFilter,
  handleCreateOption,
  setAssociatedFiltrOption,
}) => {
  const [showGlobalOption, setShowGlobalOption] = useState<boolean>(false);
  const [openCreateNew, setOpenCreateNew] = useState<boolean>(false);
  const [newOptionName, setNewOptionName] = useState("");
  const newOptionHandler = () => {
    setShowGlobalOption(true);
  };

  //filter associtaed options
  const [globalOption, setGlobalOption] = useState<number[]>([]);
  // setNumbers((prevNumbers) => [...prevNumbers, value]);
  const setGlobalOptin = (id: number) => {
    setGlobalOption((prevNumbers) => [...prevNumbers, id]);
    console.log("fg", globalOption);
  };
  useEffect(() => {
    console.log("globalOption", globalOption);
  }, [globalOption]);

  const { isLoading } = useCreateMasterOption(); //change use here
  const handleCreateButtonClick = () => {
    handleCreateOption(newOptionName);
    setNewOptionName("");
    setOpenCreateNew(false);
  };
  const closeCreateNew = () => {
    setOpenCreateNew(false);
  };

  return (
    <LargeModal
      title="Options"
      open={show}
      onClose={() => (handleShow(false), setShowGlobalOption(false))}
    >
      <Grid
        container
        gap={2}
        sx={{
          position: "sticky",
          bottom: "5rem",
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem",
          marginTop: 3,

          // alignItems: "center",
        }}
      >
        <AssociatedOptions
          newOptionHandler={newOptionHandler}
          // options={data}
          options={
            data?.filter((item) => {
              return globalOption.includes(item.id);
            }) || []
          }
          setAssociatedFiltrOption={setAssociatedFiltrOption}
        />

        {showGlobalOption && (
          <GloballyAvailableOptions
            options={data}
            setGlobalOptin={setGlobalOptin}
            setCreateNew={() => setOpenCreateNew(true)}
          />
        )}
        <Grid
          sx={{
            position: "sticky",
            top: "0rem",
            zIndex: 1, // Adjust this value if needed to control the button's layering
            background: "#fff", // Add a background color to prevent overlap with content
            height: "fit-content",
          }}
        >
          <Button variant="outlined" onClick={() => handleBackToFilter(true)}>
            Go back to filters
          </Button>
        </Grid>

        <CreateNewOptions
          // handleBackToFilter={handleBackToFilter}
          openCreateNew={openCreateNew}
          closeCreateNew={closeCreateNew}
          newOptionName={newOptionName}
          setNewOptionName={setNewOptionName}
          handleCreateButtonClick={handleCreateButtonClick}
          isLoading={isLoading}
        />
        {/* <Button variant="outlined" onClick={() => handleBackToFilter(true)}>
          Go back to filters
        </Button> */}
      </Grid>
    </LargeModal>
  );
};

export default OptionModal;
