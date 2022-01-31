import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Match from "./pages/Match"
import Player from "./pages/Player"
import Pointstable from "./pages/Pointstable"





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matches" element={<Blogs />} />
          <Route path="/matches/:match_id" element={<Match />}/>
          <Route path="/players/:player_id" element={<Player />}/>
          <Route path="/pointstable/:year" element={<Pointstable />}/>
          {/* <Route path="/summary/:match_id" element={<Summary />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));