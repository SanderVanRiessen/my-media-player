import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { SpotifyGraphQLClient } from "spotify-graphql";
import { album, errorMessage, response } from "../Types";

declare var process: {
  env: {
    CLIENTID: string;
    CLIENTSECRET: string;
  };
};

export interface SimpleDialogProps {
  open: boolean;
  currentData: album[];
  onClose: () => void;
  setAlbum: (id: string) => void;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (
  props: SimpleDialogProps
) => {
  const { onClose, open, currentData, setAlbum } = props;
  const [searchValue, setSearchValue] = useState<string>();
  const [findAlbum, setFindAlbum] = useState<{
    empty: boolean;
    error: errorMessage[] | null;
    loading: boolean;
    data: album[] | null;
  }>({
    empty: true,
    loading: false,
    data: null,
    error: null,
  });

  const getSearchAblum = () => {
    setFindAlbum({ loading: true, empty: false, data: null, error: null });
    const config = {
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      redirectUri: "http://www.example.com/callback",
      accessToken: localStorage.getItem("token")!,
    };
    SpotifyGraphQLClient(config)
      .query(
        ` {
          albums(name: "${searchValue}"){
            id
            name
            images{
              url
            }
            artists {
              name
            }
            tracks{
              id
              name
              uri
              artists{
                name
              }
            }
          }
        } `
      )
      .then((result: response) => {
        console.log(result);
        if (result.errors) {
          setFindAlbum({
            empty: false,
            loading: false,
            data: null,
            error: result.errors,
          });
        } else {
          setFindAlbum({
            empty: false,
            loading: false,
            data: result.data.albums,
            error: null,
          });
        }
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleClose = () => {
    onClose();
  };
  const setSearchAlbum = (album: album) => {
    currentData.unshift(album);
    setAlbum(album.id);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"xs"} fullWidth={true}>
      <DialogTitle sx={{ textAlign: "center" }}>Search for album</DialogTitle>
      <Box
        sx={{
          margin: "0px 24px 16px 24px",
          display: "flex",
          flexDirection: "column",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}>
          <Box>
            <TextField
              label="Search"
              color="primary"
              value={searchValue}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ margin: "auto 0" }}>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={getSearchAblum}
              sx={{ marginLeft: "10px" }}>
              <Search />
            </IconButton>
          </Box>
        </Box>
        {findAlbum.empty && <></>}
        {findAlbum.error && "something went wrong"}
        {findAlbum.loading && <LinearProgress />}
        {findAlbum.data && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <List
              sx={{
                position: "relative",
                overflow: "auto",
                bgcolor: "background.paper",
                padding: "0",
              }}
              subheader={<li />}>
              {findAlbum.data.map((album) => {
                return (
                  <ListSubheader
                    sx={{ padding: 0 }}
                    onClick={setSearchAlbum.bind(null, album)}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="spotify img" src={album.images[0].url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={album.name}
                        secondary={
                          <Fragment>
                            {album.artists.map((artist) => {
                              return artist.name + " - ";
                            })}
                          </Fragment>
                        }
                      />
                    </ListItem>
                  </ListSubheader>
                );
              })}
            </List>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default SimpleDialog;
