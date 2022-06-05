import "./App.css";
import logo from "./logo.png";
import { Homepage } from "./pages/Homepage/homepage";
import { Landingpage } from "./pages/Landingpage/landingpage";
import { Login } from "./pages/Login-Signup/login";
import { Signup } from "./pages/Login-Signup/signup";
import { Route, Routes } from "react-router-dom";
import { Like } from "./pages/Liked/like";
import { History } from "./pages/History/history";
import { WatchLater } from "./pages/WatchLater/watchLater";
import { PrivateRoute } from "./video-components/privateRoute/privateRoute.jsx" 


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/homepage" element={<Homepage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
        <Route path="/like" element={<Like />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/watchlater" element={<WatchLater />}/>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
