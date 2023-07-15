import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { LargeModal, FilterList } from '../../../components';
import { Filter } from '../../../hooks/Filter/useFiltersAvailableForProdId';
import useCreateMasterFilter from '../../../hooks/Filter/useCreateMasterFilter';

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
  const [newFilterName, setNewFilterName] = useState('');

  const { isLoading } = useCreateMasterFilter();

  const handleCreateButtonClick = () => {
    handleCreateFilter(newFilterName);
    setNewFilterName('');
  };

  return (
    <LargeModal title="Filters" open={show} onClose={() => handleShow(false)}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <h3>Associated Filters</h3>
          <FilterList filters={prodId === 0 ? [] : data} sendFilterId={getFilterId} />
        </Grid>
        <Grid item sm={4}>
          <h3>Globally Available Filters</h3>
          <FilterList filters={data} sendFilterId={getFilterId} />
        </Grid>
        <Grid item sm={3}>
          <h3>Create New Filter</h3>
          <TextField
            label="New Filter"
            variant="outlined"
            fullWidth
            value={newFilterName}
            onChange={(e) => setNewFilterName(e.target.value)}
          />
          <Grid container marginTop={2}>
            <Button variant="contained" onClick={handleCreateButtonClick} disabled={isLoading}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </LargeModal>
  );
};

export default FilterModal;
