import { SpotifyGraphQLClient } from "spotify-graphql";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LinearProgress, Box, Button } from "@mui/material";
import { response, dataState, album } from "../Types";
import Album from "../components/albumList";
import MediaPlayer from "../components/mediaPlayer";
import dotenv from "dotenv";
import ImageSlider from "../components/imageSlider";
import SearchButton from "../components/searchAlbum";
import { getDefaultAlbums } from "../queries";

dotenv.config();
declare const process: {
  env: {
    CLIENTID: string;
    CLIENTSECRET: string;
  };
};

const Home = () => {
  const [queryResults, setQueryResults] = useState<dataState>({
    loading: true,
    data: null,
    error: null,
  });
  const [currentTrack, setCurrentTrack] = useState<string>();
  const [currentAlbum, setCurrentAlbum] = useState<album>();

  const onPlayHandler = (id: string) => {
    queryResults.data?.forEach((album) => {
      const searchTrack = album.tracks.find((track) => track.id === id);
      if (searchTrack) {
        setCurrentTrack(searchTrack.id);
      }
    });
  };

  const setAlbumHandler = (id: string) => {
    const album = queryResults.data?.find((album) => album.id === id);
    setCurrentAlbum(album);
  };

  useEffect(() => {
    const config = {
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      redirectUri: "http://www.example.com/callback",
      accessToken: localStorage.getItem("token")!,
    };
    SpotifyGraphQLClient(config)
      .query(getDefaultAlbums)
      .then((result: response) => {
        if (result.errors) {
          setQueryResults({
            loading: false,
            data: null,
            error: result.errors,
          });
        } else {
          setQueryResults({
            loading: false,
            data: result.data.albums,
            error: null,
          });
          setCurrentAlbum(result.data.albums[0]);
        }
      });
  }, []);

  if (localStorage.getItem("token")) {
    return (
      <Box>
        {queryResults.error && <Navigate to="/error" />}
        {(queryResults.loading || currentAlbum == null) && <LinearProgress />}
        {queryResults.data && currentAlbum && (
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
                    paddingBottom: "10px",
                  }}>
                  <ImageSlider
                    albums={queryResults.data}
                    onClickImage={setAlbumHandler}
                  />
                  <SearchButton
                    currentData={queryResults.data}
                    setAlbum={setAlbumHandler}
                  />
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
                      id={currentAlbum.id}
                      tracks={currentAlbum.tracks}
                      name={currentAlbum.name}
                      artists={currentAlbum.artists}
                      images={currentAlbum.images}
                      onPressPlay={onPlayHandler}
                    />
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid black",
                      width: "50%",
                    }}>
                    {currentTrack ? (
                      <MediaPlayer trackUri={currentTrack} />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}>
                        <Button
                          variant="contained"
                          onClick={onPlayHandler.bind(
                            null,
                            queryResults.data[0].tracks[0].id
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
    return <Navigate to="/" />;
  }
};

export default Home;
