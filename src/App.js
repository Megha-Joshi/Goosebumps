import "./App.css";
import { Toaster } from 'react-hot-toast';
import { Homepage } from "./pages/Homepage/homepage";
import { Landingpage } from "./pages/Landingpage/landingpage";
import { Login } from "./pages/Login-Signup/login";
import { Signup } from "./pages/Login-Signup/signup";
import { Route, Routes } from "react-router-dom";
import { Like } from "./pages/Liked/like";
import { History } from "./pages/History/history";
import { WatchLater } from "./pages/WatchLater/watchLater";
import { PrivateRoute } from "./video-components/privateRoute/privateRoute.jsx" 
import { Stream } from "./pages/Stream/stream";
import { Playlist } from "./pages/Playlist/playlists";
import { SinglePlaylist } from "./pages/Playlist/singlePlaylist";


function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/homepage" element={<Homepage />}/>
        <Route path="/homepage/:videoID" element={<Stream />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
        <Route path="/like" element={<Like />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/watchlater" element={<WatchLater />}/>
        <Route path = "/playlists" element = { <Playlist />} />
        <Route path = "/playlists/:playlistID" element = { <SinglePlaylist />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
