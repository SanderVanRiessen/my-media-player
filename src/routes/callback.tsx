import { Navigate } from "react-router-dom";

const convertHashUrltoObject = (hash: string) => {
  let authObject = new Map<string, string>();
  const urlWithoutHash = hash.substring(1);
  const splitUrlOnParams = urlWithoutHash.split("&");
  splitUrlOnParams.forEach((param: string) => {
    const [key, value] = param.split("=");
    authObject.set(key, value);
  });
  if (authObject.get("access_token")) {
    localStorage.setItem("token", authObject.get("access_token")!);
  }
};

const callback = () => {
  if (window.location.hash) {
    convertHashUrltoObject(window.location.hash);
    return <Navigate to="/home" />;
  }
  return <Navigate to="/error" />;
};

export default callback;
