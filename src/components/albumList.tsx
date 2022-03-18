import { List } from "@mui/material";
import Card from "./albumCard";
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListSubheader,
} from "@mui/material";
import { FC, Fragment } from "react";
import { album } from "../Types";

const Album: FC<album> = (props) => {
  const { name, artists, tracks, images, onPressPlay } = props;

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "auto",
        bgcolor: "background.paper",
        padding: "0",
      }}
      subheader={<li />}>
      <ListSubheader sx={{ padding: 0 }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="spotify img" src={images[0].url} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <Fragment>
                {artists.map((artist) => {
                  return artist.name + " - ";
                })}
              </Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </ListSubheader>
      {tracks.map((track) => {
        return (
          <Card
            id={track.id}
            name={track.name}
            artists={track.artists}
            onPressPlay={onPressPlay}
            uri={track.uri}
          />
        );
      })}
    </List>
  );
};

export default Album;
