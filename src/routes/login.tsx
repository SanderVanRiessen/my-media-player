const clientId = "1e15abbd5a8f4f6e8e8f4b529a3dc618";
const redirectUri = "http://localhost:3000/callback";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];
const scope = scopes.join("%20");

const url: any = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog-true`;

const Background = () => {
  const handleclick = (): any => {
    window.location = url;
  };
  return (
    <>
      <h1>login with spotify</h1>
      <button onClick={handleclick}>spotify login</button>
    </>
  );
};

export default Background;
