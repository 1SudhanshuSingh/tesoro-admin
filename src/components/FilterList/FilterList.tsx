import React, { useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";

interface FilterListProps {
  filters: Filter[] | null;
  showOption?: boolean;
  showAttachNew?: boolean;
  newFilterHandler?: () => void;
  setCreateNew?: () => void;
  handleFilter: (id: number, name: string) => void;
  // setGlobalFilte?: (id: number) => void;
  // setAssociatedFiltr?: (id: number) => void;
  setGlobalFilte?: (ids: number[]) => void;

  setAssociatedFiltr?: (ids: number[]) => void;
}

const FilterList: React.FC<FilterListProps> = ({
  filters,
  showOption,
  showAttachNew,
  newFilterHandler,
  setCreateNew,
  handleFilter,
  setGlobalFilte,
  setAssociatedFiltr,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    if (setGlobalFilte && selectedFilters.length > 0) {
      // Pass the array of selected filter IDs to the setGlobalFilte function
      setGlobalFilte(selectedFilters);
    }
    if (setAssociatedFiltr && selectedFilters.length > 0) {
      // Pass the array of selected filter IDs to the setAssociatedFiltr function
      setAssociatedFiltr(selectedFilters);
    }
  };

  const handleFilterToggle = (filterId: number) => {
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterId)) {
        return prevSelectedFilters.filter(
          (selectedFilter) => selectedFilter !== filterId
        );
      } else {
        return [...prevSelectedFilters, filterId];
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (!term) {
      setSelectedFilters([]);
    }
  };

  const filterMatchesSearchTerm = (filter: Filter) => {
    return filter.filter_name?.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
      />
      <div style={{ maxHeight: "60vh", overflow: "auto", marginTop: "1rem" }}>
        <Box>
          {filters &&
            filters.map((filter) =>
              filterMatchesSearchTerm(filter) ? (
                <Box
                  key={filter.filter_id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={selectedFilters.includes(filter.filter_id)}
                      onChange={() => handleFilterToggle(filter.filter_id)}
                    />
                    {showOption ? (
                      <Button
                        variant="text"
                        onClick={() => {
                          return handleFilter(
                            filter.filter_id,
                            filter.filter_name
                          );
                        }}
                      >
                        {filter.filter_name}
                      </Button>
                    ) : (
                      <Typography>{filter.filter_name}</Typography>
                    )}
                  </Box>
                </Box>
              ) : null
            )}
        </Box>
      </div>
      <Grid container gap={2} marginTop={2}>
        <Grid>
          <Button variant="outlined">Cancel</Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid>
          {showAttachNew ? (
            <Button variant="contained" onClick={newFilterHandler}>
              Attach New
            </Button>
          ) : (
            <Button variant="contained" onClick={setCreateNew}>
              Create New
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FilterList;

// import React, { useState } from "react";
// import {
//   Typography,
//   Box,
//   Checkbox,
//   TextField,
//   Grid,
//   Button,
// } from "@mui/material";
// import { Filter } from "../../hooks/Filter/useFiltersAvailableForProdId";

// interface FilterListProps {
//   filters: Filter[] | null;
//   showOption?: boolean;
//   showAttachNew?: boolean;
//   newFilterHandler?: () => void;
//   setCreateNew?: () => void;
//   setGlobalFilte?: (id: number) => void;
//   handleFilter: (id: number) => void;
//   setAssociatedFiltr?: (id: number) => void;
// }

// const FilterList: React.FC<FilterListProps> = ({
//   filters,
//   showOption,
//   showAttachNew,
//   newFilterHandler,
//   setCreateNew,
//   handleFilter,
//   setGlobalFilte,
//   setAssociatedFiltr,
// }) => {
//   const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const handleSubmit = () => {
//     if (setGlobalFilte && selectedFilters.length > 0) {
//       const [firstFilterId] = selectedFilters; // Take the first filter id from the selectedFilters array
//       setGlobalFilte(firstFilterId); // Pass the first filter id as a single number argument
//     }
//     if (setAssociatedFiltr && selectedFilters.length > 0) {
//       const [firstFilterId] = selectedFilters; // Take the first filter id from the selectedFilters array
//       setAssociatedFiltr(firstFilterId); // Pass the first filter id as a single number argument
//     }
//   };
//   const handleFilterToggle = (filterId: number) => {
//     setSelectedFilters((prevSelectedFilters) => {
//       if (prevSelectedFilters.includes(filterId)) {
//         return prevSelectedFilters.filter(
//           (selectedFilter) => selectedFilter !== filterId
//         );
//       } else {
//         return [...prevSelectedFilters, filterId];
//       }
//     });
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value;
//     setSearchTerm(term);
//     if (!term) {
//       setSelectedFilters([]);
//     }
//   };

//   const filterMatchesSearchTerm = (filter: Filter) => {
//     return filter.filter_name?.toLowerCase().includes(searchTerm.toLowerCase());
//   };

//   return (
//     <>
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearch}
//         fullWidth
//       />
//       <div style={{ maxHeight: "60vh", overflow: "auto", marginTop: "1rem" }}>
//         <Box>
//           {filters &&
//             filters.map((filter) =>
//               filterMatchesSearchTerm(filter) ? (
//                 <Box
//                   key={filter.filter_id}
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="space-between"
//                 >
//                   <Box display="flex" alignItems="center">
//                     <Checkbox
//                       checked={selectedFilters.includes(filter.filter_id)}
//                       onChange={() => handleFilterToggle(filter.filter_id)}
//                     />
//                     {showOption ? (
//                       <Button
//                         variant="text"
//                         onClick={() => {
//                           console.log("handle");
//                           return handleFilter(filter.filter_id);
//                         }}
//                       >
//                         {filter.filter_name}
//                       </Button>
//                     ) : (
//                       <Typography>{filter.filter_name}</Typography>
//                     )}
//                   </Box>
//                 </Box>
//               ) : null
//             )}
//         </Box>
//       </div>
//       <Grid container gap={2} marginTop={2}>
//         <Grid>
//           <Button variant="outlined">Cancel</Button>
//         </Grid>
//         <Grid>
//           <Button variant="contained" onClick={handleSubmit} >
//             Submit
//           </Button>
//         </Grid>
//         <Grid>
//           {showAttachNew ? (
//             <Button variant="contained" onClick={newFilterHandler} >
//               Attach New
//             </Button>
//           ) : (
//             <Button variant="contained" onClick={setCreateNew}>
//               Create New
//             </Button>
//           )}
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default FilterList;
