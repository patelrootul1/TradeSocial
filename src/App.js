import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import RecommendFollowers from "./components/recommendFollowers/RecommendFollowers";
import ProfilePage from "./components/profilepage/profilepage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div className="components-container">
                <Navigation />
                <Home />
                <RecommendFollowers />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage userId={'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'}/>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
