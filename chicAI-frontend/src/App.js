import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar/NavigationBar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile'; // Import User Profile Component
import EventCalendar from './components/EventCalendar/EventCalendar';

function App() {
  return (
    <Router>
      <Container className='App' fluid>
        {/* Header */}
        <div className='nav-and-header'>

          {/* Navigation Bar */}
          <NavigationBar />

          {/* Nav Bar Brand */}
          <div className='navbar-brand-app'>
            <Navbar.Brand href="#chic-ai" className='navbar-brand'>
              ChicAI
            </Navbar.Brand>
          </div>

          {/* Header Content */}
          <Header />
        </div>

        <Routes>
            {/* Default Route */}
            <Route path="/" element={<EventCalendar />} /> {/* Updated to UserProfile */}
            
            {/* Specific Routes */}
            <Route path="/" element={<UserProfile />} /> {/* User Profile Route */}
        </Routes>

        {/* Footer Content */}
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
