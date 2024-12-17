import './App.css';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile'; // Import User Profile Component

function App() {
  return (
    <Router>
      <Container className='App' fluid>
        <Routes>
            {/* Default Route */}
            <Route path="/" element={<UserProfile />} /> {/* Updated to UserProfile */}
            
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
