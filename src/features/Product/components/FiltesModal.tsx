import React, { useState } from "react";
import { Grid, TextField, Button, Modal, Box } from "@mui/material";
import { LargeModal, FilterList } from "../../../components";
import { Filter } from "../../../hooks/Filter/useFiltersAvailableForProdId";
import useCreateMasterFilter from "../../../hooks/Filter/useCreateMasterFilter";

interface FilterModalProps {
  prodId: number;
  show: boolean;
  data: Filter[] | null;
  handleShow: (show: boolean) => void;
  getFilterId: (id: number) => void;
  handleCreateFilter: (filterName: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  prodId,
  show,
  data,
  handleShow,
  getFilterId,
  handleCreateFilter,
}) => {
  const [newFilterName, setNewFilterName] = useState("");
  const [showGlobalFilter, setShowGlobalFilter] = useState<boolean>(false);
  const [openCreateNew, setOpenCreateNew] = useState<boolean>(false);

  const { isLoading } = useCreateMasterFilter();

  const handleCreateButtonClick = () => {
    handleCreateFilter(newFilterName);
    setNewFilterName("");
    setOpenCreateNew(false);
  };

  const newFilterHandler = () => {
    setShowGlobalFilter(true);
  };
  const closeCreateNew = () => {
    setOpenCreateNew(false);
  };
  return (
    <LargeModal title="Filters" open={show} onClose={() => handleShow(false)}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <h3>Associated Filters</h3>
          <FilterList
            showOption
            showAttachNew
            filters={data}
            sendFilterId={getFilterId}
            newFilterHandler={newFilterHandler}
          />
        </Grid>
        {showGlobalFilter && (
          <Grid item sm={4}>
            <h3>Globally Available Filters</h3>
            <FilterList
              filters={data}
              sendFilterId={getFilterId}
              setCreateNew={() => setOpenCreateNew(true)}
            />
          </Grid>
        )}
        <Modal
          open={openCreateNew}
          onClose={closeCreateNew}
          aria-labelledby="large-modal-title"
          aria-describedby="large-modal-description"
          closeAfterTransition
        >
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              width: "50%",
              margin: "0 25%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: "1rem",
            }}
          >
            <h3>Create New Filter</h3>
            <TextField
              label="New Filter"
              variant="outlined"
              fullWidth
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
            />
            <Grid container marginTop={2}>
              <Grid marginRight={2}>
                <Button
                  variant="contained"
                  onClick={handleCreateButtonClick}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </Grid>
              <Grid marginRight={2}>
                <Button
                  variant="contained"
                  onClick={closeCreateNew}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>
    </LargeModal>
  );
};

export default FilterModal;