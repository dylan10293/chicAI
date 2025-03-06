import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Container, Row, Col, Button } from "react-bootstrap";  // Import Bootstrap components
import "./ProfilePage.css"; // Import the CSS file

function ProfilePage() {
  const { userId } = useAuth();
  const [userData, setUserData] = useState(null);

  const API_BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

  useEffect(() => {
    if (!userId) return;

    fetch(`${API_BASE_URL}/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("User from MongoDB:", data);
        setUserData(data);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [userId]);

  if (!userData) return <p className="profile-loading">Loading...</p>;

  return (
    <Container className="profile-container" fluid>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="profile-card">
            <div className="profile-image-container">
              <img src="/profile-image.png" alt="Profile" className="profile-image" />
              {/* /Users/sharondsouza/chicAI/chicAI-frontend/public/profile-image.png */}
            </div>
            <div className="profile-details">
              <h3>{userData.first_name} {userData.last_name}</h3>
              <p>Email: {userData.email_address}</p>
              <Button className="profile-edit-btn" variant="primary">Edit Profile</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
