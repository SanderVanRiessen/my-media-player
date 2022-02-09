import * as React from "react";
import Box from "@mui/material/Box";

const MusicPlayerSlider: React.FC<{ trackUri: string }> = ({ trackUri }) => {
  const splitTrackUri = trackUri.split(":");
  const spotifyTrackId = splitTrackUri[splitTrackUri.length - 1];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <iframe
        title="Media Player"
        src={"https://open.spotify.com/embed/track/" + spotifyTrackId}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </Box>
  );
};

export default MusicPlayerSlider;
