import { SpotifyGraphQLClient } from "spotify-graphql";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LinearProgress, Box, Button, Grid } from "@mui/material";
import { response, dataState, currentTrack } from "../Types";
import Album from "../components/albumList";
import MediaPlayer from "../components/mediaPlayer";
import dotenv from "dotenv";
import ImageSlider from "../components/imageSlider";
import { height } from "@mui/system";

dotenv.config();
declare var process: {
  env: {
    CLIENTID: string;
    CLIENTSECRET: string;
  };
};

const Home = () => {
  const [state, setState] = useState<dataState>({
    loading: true,
    data: null,
    error: null,
  });
  const [currentTrack, setCurrentTrack] = useState<currentTrack>();

  const onPlayHandler = (id: string) => {
    const track = state.data?.tracks.find((track) => track.id === id);
    if (track) {
      setCurrentTrack({
        track,
        albumName: state.data ? state.data.name : "empty",
        images: state.data ? state.data.images : [{ url: "empty" }],
      });
    }
  };

  // const id = "33pt9HBdGlAbRGBHQgsZsU";

  useEffect(() => {
    const config = {
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      redirectUri: "http://www.example.com/callback",
      accessToken: localStorage.getItem("token")!,
    };
    SpotifyGraphQLClient(config)
      .query(
        `{
            album(id: "0xJyM0DFwty067hIBH5fql") {
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
        }`
      )
      .then((result: response) => {
        if (result.errors) {
          setState({
            loading: false,
            data: null,
            error: result.errors,
          });
        } else {
          setState({
            loading: false,
            data: result.data.album,
            error: null,
          });
        }
      });
  }, []);

  if (localStorage.getItem("token")) {
    return (
      <Box>
        {state.error && <Navigate to='/error' />}
        {state.loading && <LinearProgress />}
        {state.data && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexGrow: "1",
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "60%",
                  height: "80%",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "30%",
                    width: "100%",
                  }}>
                  <ImageSlider />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    height: "70%",
                  }}>
                  <Box
                    sx={{
                      width: "50%",
                    }}>
                    <Album
                      tracks={state.data.tracks}
                      name={state.data.name}
                      artists={state.data.artists}
                      images={state.data.images}
                      onPressPlay={onPlayHandler}
                    />
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid black",
                      width: "50%",
                    }}>
                    {currentTrack ? (
                      <MediaPlayer
                        track={currentTrack.track}
                        albumName={state.data.name}
                        images={state.data.images}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}>
                        <Button
                          variant='contained'
                          onClick={onPlayHandler.bind(
                            null,
                            state.data.tracks[0].id
                          )}>
                          Play first song
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    );
  } else {
    return <Navigate to='/' />;
  }
};

export default Home;
