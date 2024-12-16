import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';
import { useUser, useAuth } from "@clerk/clerk-react";
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';
import WardrobeManagement from './components/wardrobeManagement/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import OutfitManagement from "./components/outfitsManage/OutfitManagement";
import OutfitCreator from "./components/outfitsManage/OutfitCreator";
import Laundry from './components/Laundry/Laundry';
import Details from './components/wardrobeManagement/IndividualItemView/ItemEditView';
import './App.css';

function App() {

  const { isSignedIn } = useUser();
  const { userId } = useAuth();

  return (
    <Router>
      <Container className="App" fluid>
        {/* Header */}
        <div className="nav-and-header">
          {/* Navigation Bar */}
          <NavigationBar />

          {/* Nav Bar Brand */}
          <div className="navbar-brand-app">
            <Navbar.Brand href="#chic-ai" className="navbar-brand">
              ChicAI
            </Navbar.Brand>
          </div>

          {/* Header Content */}
          <Header />
        </div>

        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={
              isSignedIn && userId ? <Navigate to="/outfits" /> : <Homepage />
            }
          />

          {/* Specific Routes */}
          <Route
            path="/outfits"
            element={
              isSignedIn && userId ? <OutfitCreator userId={userId} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isSignedIn && userId ? <Dashboard /> : <Navigate to="/" />
            }
          />
          <Route path="/wardrobe-management" element={<WardrobeManagement />} />
          <Route path="/laundry" element={<Laundry />} />
          <Route path="/details" element={<Details />} />
        </Routes>

        {/* Footer Content */}
        <Footer />
      </Container>
    </Router>

  );
}

export default App;
