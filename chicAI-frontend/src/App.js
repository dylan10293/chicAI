import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import OutfitManagement from "./components/outfitsManage/OutfitManagement";
import OutfitCreator from "./components/outfitsManage/OutfitCreator";
import './App.css';

function App() {

  const { isSignedIn } = useUser();
  const { userId } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isSignedIn && userId ? <Navigate to="/outfits" /> : <Homepage />} />
          {/* <OutfitCreator userId="user_2q0a6hxnhL1ou9w5PlVpD1P8wXh" /> */}
          <Route path="/outfits" element={isSignedIn && userId ? <OutfitCreator userId={userId} /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={isSignedIn && userId ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
