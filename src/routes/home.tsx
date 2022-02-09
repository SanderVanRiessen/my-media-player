import { SpotifyGraphQLClient } from "spotify-graphql";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LinearProgress, Box, Button } from "@mui/material";
import { response, dataState, album } from "../Types";
import Album from "../components/albumList";
import MediaPlayer from "../components/mediaPlayer";
import dotenv from "dotenv";
import ImageSlider from "../components/imageSlider";

dotenv.config();
//if you dont change this variable, it can be a constant
declare var process: {
  env: {
    CLIENTID: string;
    CLIENTSECRET: string;
  };
};

const Home = () => {
  //whats in this state maybe the name should be a bit more describing?
  const [state, setState] = useState<dataState>({
    loading: true,
    data: null,
    error: null,
  });
  const [currentTrack, setCurrentTrack] = useState<string>();
  const [currentAlbum, setCurrentAlbum] = useState<album>();

  const onPlayHandler = (id: string) => {
    state.data?.forEach((album) => {
      const searchTrack = album.tracks.find((track) => track.id === id);
      if (searchTrack) {
        setCurrentTrack(searchTrack.id);
      }
    });
  };

  const setAlbumHandler = (id: string) => {
    const album = state.data?.find((album) => album.id === id);
    setCurrentAlbum(album);
  };

  useEffect(() => {
    const config = {
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      redirectUri: "http://www.example.com/callback",
      accessToken: localStorage.getItem("token")!,
    };
    //not really feedback but more a suggestion, maybe u can store the actuall queries in a seperate file so the code looks cleaner
    SpotifyGraphQLClient(config)
      .query(
        `  {
    albums(ids: "0xJyM0DFwty067hIBH5fql,33pt9HBdGlAbRGBHQgsZsU,21jF5jlMtzo94wbxmJ18aa,6i6folBtxKV28WX3msQ4FE,0Y7qkJVZ06tS2GUCDptzyW,06mXfvDsRZNfnsGZvX2zpb") {
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
            data: result.data.albums,
            error: null,
          });
        }
      });
  }, []);

  if (localStorage.getItem("token")) {
    return (
      <Box>
        {state.error && <Navigate to="/error" />}
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
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "60%",
                  height: "80%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "30%",
                    width: "100%",
                    paddingBottom: "10px",
                  }}
                >
                  <ImageSlider
                    albums={state.data}
                    onClickImage={setAlbumHandler}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    height: "70%",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                    }}
                  >
                    {/*i dont know if currentAlbum?.id is a good practice since u also already enforce it in the album type u created */}
                    <Album
                      id={currentAlbum?.id || state.data[0].id}
                      tracks={currentAlbum?.tracks || state.data[0].tracks}
                      name={currentAlbum?.name || state.data[0].name}
                      artists={currentAlbum?.artists || state.data[0].artists}
                      images={currentAlbum?.images || state.data[0].images}
                      onPressPlay={onPlayHandler}
                    />
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid black",
                      width: "50%",
                    }}
                  >
                    {currentTrack ? (
                      <MediaPlayer trackUri={currentTrack} />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={onPlayHandler.bind(
                            null,
                            state.data[0].tracks[0].id
                          )}
                        >
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
    return <Navigate to="/" />;
  }
};

export default Home;
