import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { album } from "../Types";
import styled from "styled-components";

const ImageDiv = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
`;

const SwipeableTextMobileStepper: FC<{
  albums: album[];
  onClickImage: (id: string) => void;
}> = (props) => {
  const { albums, onClickImage } = props;

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = albums.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    onClickImage(albums[activeStep].id);
  }, [activeStep, albums, onClickImage]);

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          padding: 0,
          display: "flex",
          alignItems: "center",
          pl: 2,
          bgcolor: "background.default",
          justifyContent: "center",
        }}>
        <Typography>{albums[activeStep].name}</Typography>
      </Paper>
      {albums.map((step, index) => {
        return (
          index === activeStep && (
            <ImageDiv>
              <Box
                component="img"
                sx={{
                  display: "block",
                  height: "100%",
                  overflow: "hidden",
                }}
                src={step.images[0].url}
                alt={step.name}
              />
            </ImageDiv>
          )
        );
      })}

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default SwipeableTextMobileStepper;
