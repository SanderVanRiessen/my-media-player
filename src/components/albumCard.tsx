import * as React from "react";
import { ListItem, Divider, ListItemText, Typography } from "@mui/material";
import { track } from "../Types";

const Card: React.FC<track> = (props) => {
  const { name, artists, onPressPlay, id } = props;

  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component='span'
                variant='body2'
                color='text.primary'>
                {artists.map((artist) => {
                  return artist.name + " - ";
                })}
              </Typography>
            </React.Fragment>
          }
        />
        <button onClick={onPressPlay.bind(null, id)}>play</button>
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
};
export default Card;
