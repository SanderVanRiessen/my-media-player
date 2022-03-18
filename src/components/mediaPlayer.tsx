import { FC } from "react";
import Box from "@mui/material/Box";

const MusicPlayerSlider: FC<{ trackUri: string }> = ({ trackUri }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <iframe
        title="Media Player"
        src={"https://open.spotify.com/embed/track/" + trackUri}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </Box>
  );
};

export default MusicPlayerSlider;
