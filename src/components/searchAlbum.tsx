import * as React from "react";
import { Button } from "@mui/material";
import SimpleDialog from "./searchDialog";
import { album } from "../Types";

const SearchButton: React.FC<{
  currentData: album[];
  setAlbum: (id: string) => void;
}> = (props) => {
  const { currentData, setAlbum } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleClickOpen}>search for album</Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        currentData={currentData}
        setAlbum={setAlbum}
      />
    </>
  );
};
export default SearchButton;
