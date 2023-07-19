import React, { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { LargeModal, OptionList } from "../../../components";
import useCreateMasterFilter from "../../../hooks/Filter/useCreateMasterFilter";
import useFiltersAvailableForProdId from "../../../hooks/Filter/useFiltersAvailableForProdId";
import { Filter } from "../../../hooks/Filter/useFiltersAvailableForProdId";
import FilterModal from "./FiltersModal";
// import OptionModal from "./OptionModal";
// import { OptionData } from "../Dummy";

interface ModelsProps {
  prodId: number;
  setShowAttachNewFilter: (show: boolean) => void;
  filterData: Filter[] | null;
  showAttachNewFilter: boolean;
  setChipdata: (dta: Filter[]) => void;
}

const Models: React.FC<ModelsProps> = ({
  prodId,
  setShowAttachNewFilter,
  filterData,
  showAttachNewFilter,
  setChipdata,
}) => {
  const { refetch } = useFiltersAvailableForProdId(prodId);
  const { createMasterFilter, data: createdDataRes } = useCreateMasterFilter();
  const [showAttachOption, setShowAttachOption] = useState<boolean>(false);
  const [filterId, setFilterId] = useState<number>(0);
  const getFilterId = (id: number) => {
    if (id) {
      setFilterId(id);
    //   setShowAttachOption(true);
    //   setShowAttachNewFilter(false);
      setVisibleOption(true);
    }
    console.log(id);
  };
  const handleBackToFilter = () => {
    setShowAttachOption(false);
    setShowAttachNewFilter(true);
  };

  const handleCreateFilter = async (filterName: string) => {
    await createMasterFilter({
      filterName,
      filterOptions: "[]",
    });
    await refetch();
  };
  const [AssociatedFilters, setAssociatedFilters] = useState<number[]>([]);

  const setAssociatedFiltr = (id: number) => {
    setAssociatedFilters((prevNumbers) => {
      if (!AssociatedFilters.includes(id)) {
        return [...prevNumbers, id];
      }
      return prevNumbers;
    });
  };

  useEffect(() => {
    const dta =
      filterData?.filter((item) => {
        return AssociatedFilters.includes(item.filter_id);
      }) || [];
    setChipdata(dta);

    console.log("manage filter chips", AssociatedFilters);
  }, [AssociatedFilters]);

  const [visibleOption, setVisibleOption] = useState<boolean>(false);
  //   const toggleComponent = () => {
  //     setShowComponent(!showComponent);
  //   };

  return (
    <>
      <FilterModal
        prodId={prodId}
        data={filterData}
        show={showAttachNewFilter}
        handleShow={setShowAttachNewFilter}
        getFilterId={getFilterId}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        handleCreateFilter={handleCreateFilter}
        setAssociatedFiltr={setAssociatedFiltr}
        //options
        handleBackToFilter={handleBackToFilter}
        visibleOption={visibleOption}
        setVisibleOption={setVisibleOption}
      />
      {/* <OptionModal
          data={OptionData}
          // show={true}
          // show={showAttachOption}
          // handleShow={setShowAttachOption}
          handleBackToFilter={handleBackToFilter}
          visibleOption={visibleOption}
          setVisibleOption={setVisibleOption}
        /> */}
    </>
  );
};

export default Models;
