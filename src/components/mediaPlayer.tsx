import * as React from "react";
import Box from "@mui/material/Box";
import { currentTrack } from "../Types";

const MusicPlayerSlider: React.FC<currentTrack> = (props) => {
  const { track } = props;
  const splitTrackUri = track.uri.split(":");
  const spotifyTrackId = splitTrackUri[splitTrackUri.length - 1];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <iframe
        title='Media Player'
        src={"https://open.spotify.com/embed/track/" + spotifyTrackId}
        width='100%'
        height='100%'
        frameBorder='0'
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>
    </Box>
  );
};

export default MusicPlayerSlider;
