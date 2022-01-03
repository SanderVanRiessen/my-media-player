import { SpotifyGraphQLClient } from "spotify-graphql";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { response, dataState, currentTrack } from "../Types";
import Album from "../components/albumList";
import MediaPlayer from "../components/mediaPlayer";
import dotenv from "dotenv";

dotenv.config();
declare var process: {
  env: {
    CLIENTID: string;
    CLIENTSECRET: string;
  };
};

const Home = () => {
  const config = {
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirectUri: "http://www.example.com/callback",
    accessToken: localStorage.getItem("token")!,
  };
  const [state, setState] = useState<dataState>({
    loading: true,
    data: null,
    error: null,
  });
  const [currentTrack, setCurrentTrack] = useState<currentTrack>();

  // default for currentTrack
  // {
  //   track: state.data.tracks[0],
  //   albumName: state.data ? state.data.name : "empty",
  //   images: state.data ? state.data.images : [{ url: "empty" }],
  // }

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

  return (
    <>
      {state.error && <Navigate to='/error' />}
      {state.loading && <LinearProgress />}
      {state.data && (
        <>
          <Album
            tracks={state.data.tracks}
            name={state.data.name}
            artists={state.data.artists}
            images={state.data.images}
            onPressPlay={onPlayHandler}
          />
          {currentTrack && (
            <MediaPlayer
              track={currentTrack.track}
              albumName={state.data.name}
              images={state.data.images}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
