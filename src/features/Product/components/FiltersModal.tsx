import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { LargeModal } from "../../../components";
import { Filter } from "../../../hooks/Filter/useFiltersAvailableForProdId";
import useCreateMasterFilter from "../../../hooks/Filter/useCreateMasterFilter";
import AssociatedFilter from "../../components/AssociatedFilter";
import GlobalAvailableFilter from "../../components/GlobalAvailableFilter";
import CreateNewFilter from "../../components/CreateNewFilter";

interface FilterModalProps {
  prodId: number;
  selectedGlobalFilter: Filter[] | null;
  show: boolean;
  data: Filter[] | null;
  handleShow: (show: boolean) => void;
  getFilterId: (id: number, name: string) => void;
  handleCreateFilter: (filterName: string) => void;
  setAssociatedFiltr?: (ids: number[]) => void;
  setGlobalFilte?: (ids: number[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  prodId,
  show,
  data,
  handleShow,
  getFilterId,
  handleCreateFilter,
  setAssociatedFiltr,
  setGlobalFilte,
  selectedGlobalFilter,
}) => {
  const [newFilterName, setNewFilterName] = useState("");
  /*
  const [globalFilter, setGlobalFilter] = useState<number[]>([]);
console.log("filter passed to associtiate",globalFilter)
  const setGlobalFilte = (ids: number[]) => {
    setGlobalFilter((prevNumbers) => {
      const uniqueIds = new Set([...prevNumbers, ...ids]);
      return Array.from(uniqueIds);
    });
  };

  useEffect(() => {}, [globalFilter]);
*/

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
    <LargeModal
      title="Filters"
      open={show}
      onClose={() => (handleShow(false), setShowGlobalFilter(false))}
    >
      <Grid container spacing={2}>
        <AssociatedFilter
          showOption
          showAttachNew
          filters={selectedGlobalFilter}
          // sendFilterId={getFilterId}
          handleFilter={getFilterId}
          newFilterHandler={newFilterHandler}
          setAssociatedFiltr={setAssociatedFiltr}
        />

        {showGlobalFilter && (
          <GlobalAvailableFilter
            filters={data}
            // sendFilterId={getFilterId}
            setGlobalFilte={setGlobalFilte}
            handleFilter={getFilterId}
            setCreateNew={() => setOpenCreateNew(true)}
          />
        )}

        <CreateNewFilter
          openCreateNew={openCreateNew}
          closeCreateNew={closeCreateNew}
          newFilterName={newFilterName}
          setNewFilterName={setNewFilterName}
          handleCreateButtonClick={handleCreateButtonClick}
          isLoading={isLoading}
        />
      </Grid>
    </LargeModal>
  );
};

export default FilterModal;
