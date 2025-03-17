import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';
import { useUser, useAuth } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";  // Import Framer Motion
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';
import WardrobeManagement from './components/wardrobeManagement/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import OutfitCreator from "./components/outfitsManage/OutfitCreator";
import Laundry from './components/Laundry/Laundry';
import Details from './components/wardrobeManagement/IndividualItemView/ItemEditView';
import ProfilePage from './components/ProfilePage/ProfilePage';

import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const { isSignedIn } = useUser();
  const { userId } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <Navigate to="/outfits" /> : <Homepage />}
            </motion.div>
          }
        />
        <Route
          path="/outfits"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <OutfitCreator userId={userId} /> : <Navigate to="/" />}
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <Dashboard /> : <Navigate to="/" />}
            </motion.div>
          }
        />
        <Route
          path="/wardrobe-management"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <WardrobeManagement userId={userId} /> : <Navigate to="/" />}
            </motion.div>
          }
        />
        <Route
          path="/laundry"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <Laundry userId={userId} /> : <Navigate to="/" />}
            </motion.div>
          }
        />
        <Route
          path="/details"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <Details userId={userId} /> : <Navigate to="/" />}
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignedIn && userId ? <ProfilePage userId={userId} /> : <Navigate to="/" />}
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { isSignedIn } = useUser();

  return (
    <Router>
      <div className="app-wrapper">
        {isSignedIn && (
          <div className="nav-and-header">
            <NavigationBar />
            <Navbar.Brand href="/" className="navbar-brand">
              <h3 className="text-light">ChicAI</h3>
            </Navbar.Brand>
            <Header />
          </div>
        )}

        <Container className="main-content" fluid>
          <AnimatedRoutes />
        </Container>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
