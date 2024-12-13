import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./SuggestionGenerator.css";

const SuggestionGenerator = () => {
  const [userId, setUserId] = useState("user_2q0a6hxnhL1ou9w5PlVpD1P8wXh"); //TODO: fetch this userId to remove hardcoded data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchLatestSuggestion = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/suggestions/latest/${userId}`);
      setSuggestions(response.data.suggestion.suggestions);
      setSuccess("Loaded previous suggestion as a new suggestion can only be generated once per 24 hours");
      return true;
    } catch (err) {
      if (err.response?.status === 404) {
        return false; // No recent suggestion found
      }
      setError("Failed to fetch latest suggestion.");
      return true;
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setSuggestions([]);

    // Check for existing suggestion
    const hasRecentSuggestion = await fetchLatestSuggestion();
    if (hasRecentSuggestion) {
      setLoading(false);
      return;
    }

    // Generate a new suggestion if none exists
    try {
      const response = await axios.post("http://localhost:8000/api/suggestions/generate", {
        userId,
      });
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate suggestions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (outfit) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:8000/api/outfits/create", {
        name: outfit.name,
        items: outfit.items.map((item) => item.wardrobeItemId), // Send wardrobeItemIds only
        userId,
      });
      setSuccess(`Outfit "${outfit.name}" saved successfully!`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save outfit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, []);


  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {suggestions.length > 0 && (
        <div>
          <h3>Suggestions</h3>
          <Row className="g-3">
            {suggestions.map((suggestion, index) => (
              <Col xs={12} sm={6} md={4} className="d-flex" key={index}>
                <Card className="flex-fill">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{suggestion.name}</Card.Title>
                      <Card.Text>
                        <strong>Items:</strong>
                        <ul>
                          {suggestion.items.map((item, idx) => (
                            <li key={idx}>
                              {item.name} ({item.type}) - Tags: {item.tags.join(", ")}
                            </li>
                          ))}
                        </ul>
                      </Card.Text>
                    </div>
                    <Button
                      variant="success"
                      disabled={loading}
                      onClick={() => handleSave(suggestion)}
                    >
                      Save to Outfits
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default SuggestionGenerator;
