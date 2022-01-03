import { List } from "@mui/material";
import Card from "./albumCard";
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import * as React from "react";
import { album } from "../Types";

const Album: React.FC<album> = (props) => {
  const { name, artists, tracks, images, onPressPlay } = props;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='spotify img' src={images[0].url} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              {artists.map((artist) => {
                return artist.name + " - ";
              })}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      {tracks.map((track) => {
        return (
          <Card
            id={track.id}
            name={track.name}
            artists={track.artists}
            onPressPlay={onPressPlay}
          />
        );
      })}
    </List>
  );
};

export default Album;
