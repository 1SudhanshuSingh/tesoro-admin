import { useEffect, useState } from 'react';
import { TextField, List, ListItem, ListItemText, Checkbox } from '@mui/material';

type Data = {
  id: number,
  name: string,
}
interface SearchableListProps {
    data: Data[]
}
const SearchableList:React.FC<SearchableListProps> = ({
    data,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Data[]>([]);
  const [selectedItems, setSelectedItems] = useState<Data[]>([]);

  useEffect(() => {
    setFilteredItems(data);
  }, [data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = event.target.value.toLowerCase();
    setSearchText(searchInput);

    if (searchInput === '') {
      setFilteredItems(data);
    } else {
      const filtered: Data[] = data.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
      setFilteredItems(filtered);
    }
  };

  const handleCheckboxToggle = (item: Data) => {
    const selectedIndex = selectedItems.findIndex((selected) => selected.id === item.id);
    let newSelected: Data[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedItems, item];
    } else {
      newSelected = selectedItems.filter((selected) => selected.id !== item.id);
    }

    setSelectedItems(newSelected);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        fullWidth
      />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.id} dense onClick={() => handleCheckboxToggle(item)}>
            <Checkbox checked={selectedItems.some((selected) => selected.id === item.id)} />
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchableList;
