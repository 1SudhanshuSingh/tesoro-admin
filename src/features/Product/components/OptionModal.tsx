import { Grid, TextField, Button } from "@mui/material";
import { LargeModal, OptionList } from "../../../components";
import AssociatedOptions from "../../components/AssociateOptions";
import GloballyAvailableOptions from "../../components/GlobalOptions";
import CreateNewOptions from "../../components/CreateOption";

interface OptionalModalProps {
  show: boolean;
  data: Array<{
    id: number;
    label: string;
  }>;
  handleShow: (show: boolean) => void;
  handleBackToFilter: (show: boolean) => void;
}

const OptionModal: React.FC<OptionalModalProps> = ({
  show,
  data,
  handleShow,
  handleBackToFilter,
}) => {
  return (
    <LargeModal title="Options" open={show} onClose={() => handleShow(false)}>
      <Grid container gap={2}>
        <AssociatedOptions options={data} />
        <GloballyAvailableOptions options={data} />
        <CreateNewOptions handleBackToFilter={handleBackToFilter} />
      </Grid>
    </LargeModal>
  );
};

export default OptionModal;
