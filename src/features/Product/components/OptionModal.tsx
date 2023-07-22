import { Grid, TextField, Button } from "@mui/material";
import { LargeModal, OptionList } from "../../../components";
import AssociatedOptions from "../../components/AssociateOptions";
import GloballyAvailableOptions from "../../components/GlobalOptions";
import CreateNewOptions from "../../components/CreateNewOption";
import React, { useState, useEffect } from "react";
import AssociatedFilter from "../../components/AssociatedFilter";
import { Filter } from "../../../hooks/Filter/useFiltersAvailableForProdId";
import { Option } from "../../../hooks/Filter/useallFilterOptionsAvailableForFilterID";
interface OptionalModalProps {
  getFilterId: (id: number, name: string) => void;
  selectedGlobalFilter: Filter[] | null;
  show: boolean;
  data: Option[] | null;
  handleShow: (show: boolean) => void;
  handleBackToFilter: (show: boolean) => void;
  handleCreateOption: (OptionName: string) => void;
  setAssociatedFiltrOption?: (ids: number[]) => void;
  setAssociatedFiltr?: (ids: number[]) => void;
}

const OptionModal: React.FC<OptionalModalProps> = ({
  show,
  data,
  handleShow,
  handleBackToFilter,
  handleCreateOption,
  setAssociatedFiltrOption,
  setAssociatedFiltr,
  selectedGlobalFilter,
  getFilterId,
}) => {
  const [newOptionName, setNewOptionName] = useState("");
  //filter associtaed options
  const [globalOption, setGlobalOption] = useState<number[]>([]);
  const setGlobalOptin = (ids: number[]) => {
    setGlobalOption((prevNumbers) => {
      const uniqueIds = new Set([...prevNumbers, ...ids]);
      return Array.from(uniqueIds);
    });
    console.log("insicefunc", globalOption);
    console.log("ids", ids);
  };
  useEffect(() => {
    // console.log("globalOption", globalOption);
  }, [globalOption]);

  // const { isLoading } = useCreateMasterOption(); //change use here
  const isLoading = false;

  const [showGlobalOption, setShowGlobalOption] = useState<boolean>(false);
  const [openCreateNew, setOpenCreateNew] = useState<boolean>(false);

  const handleCreateButtonClick = () => {
    handleCreateOption(newOptionName);
    setNewOptionName("");
    setOpenCreateNew(false);
  };
  const newOptionHandler = () => {
    setShowGlobalOption(true);
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
        }}
      >
        <AssociatedFilter
          showOption
          showAttachNew
          filters={selectedGlobalFilter}
          // sendFilterId={getFilterId}
          handleFilter={getFilterId}
          setAssociatedFiltr={setAssociatedFiltr}
        />

        <AssociatedOptions
          options={
            data?.filter((item) => {
              return globalOption.includes(item.filter_optionID);
            }) || []
          }
          setAssociatedFiltrOption={setAssociatedFiltrOption}
          newOptionHandler={newOptionHandler}
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
