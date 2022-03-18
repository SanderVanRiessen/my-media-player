import { BrowserRouter, Routes, Route } from "react-router-dom";
import Callback from "./routes/callback";
import Login from "./routes/login";
import Error from "./routes/error";
import Home from "./routes/home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/error" element={<Error />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
