import './ItemEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import EditTagsView from './EditTagsView';
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';
import { IoClose } from "react-icons/io5";

const API_BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

function ItemEditView() {
  const location = useLocation();
  const { item, img, laundryStatus, style, color, pattern, tags, _id } = location.state; // Destructure the item and its ID

  const [showEditTags, setShowEditTags] = useState(false); // State to control EditTagsView visibility
  const [currentTags, setCurrentTags] = useState(tags || []);

  const handleEditTagsClick = () => {
    setShowEditTags(true); // Show the EditTagsView when clicked
  };

  const handleCloseEditTags = () => {
    setShowEditTags(false); // Hide the EditTagsView
  };

  // Function to refresh the tags after adding a new one
  const handleTagsAdded = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/outfits/wardrobe/${_id}/tags`);
      const data = await response.json();
      if (response.ok) {
        setCurrentTags(data.tags || []); // Update local tags state
      } else {
        console.error("Failed to fetch updated tags:", data.message);
      }
    } catch (error) {
      console.error("Error fetching updated tags:", error);
    }
  };

  // Function to handle deleting the item
  const handleDeleteItem = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/outfits/wardrobe/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Item deleted successfully!');
          // Navigate back to the previous page or wardrobe list
          window.location.href = '/wardrobe-management';
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to delete the item.');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('An error occurred while deleting the item.');
      }
    }
  };

  return (
    <Container fluid>
      <div className="item-edit-container flex-row">
        <Col md={4}>
          <img src={img} alt={item} style={{ width: '300px' }} />
          <h3>{item}</h3>
        </Col>

        <Col md={8} className="edit-fields">
          {/* Tags */}
          <div className="edit-field">
            <div className="label-icon-row">
              <label>Tags</label>
              <FaRegEdit className="edit-icon" onClick={handleEditTagsClick} />
            </div>

            <Col className='tags-align'>
              {/* Render dynamic tags */}
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <div key={index} className="tags">
                    {tag}
                  </div>
                ))
              ) : (
                <div className="tags">No tags available</div>
              )}
            </Col>
          </div>

          {/* Conditionally render EditTagsView */}
          {showEditTags && (
            <div className="edit-tags-modal">
              <IoClose className="close-icon" onClick={handleCloseEditTags} />
              <EditTagsView itemId={_id} onTagsAdded={handleTagsAdded} />
            </div>
          )}

          <div className="edit-field">
            <div className="label-icon-row">
              <label>Style</label>
              <FaRegEdit className="edit-icon" />
            </div>
            <Col className='tags-align'>
              {/* Render dynamic style */}
              <div className='tags'>{style || 'No style available'}</div>
            </Col>
          </div>

          <div className="edit-field">
            <div className="label-icon-row">
              <label>Color</label>
              <FaRegEdit className="edit-icon" />
            </div>
            <Col className='tags-align'>
              {/* Render dynamic style */}
              <div className='tags'>{color || 'No color available'}</div>
            </Col>
          </div>

          <div className="edit-field">
            <div className="label-icon-row">
              <label>Pattern</label>
              <FaRegEdit className="edit-icon" />
            </div>
            <Col className='tags-align'>
              {/* Render dynamic style */}
              <div className='tags'>{pattern || 'No pattern available'}</div>
            </Col>
          </div>

          {/* Laundry Status */}
          <div className="edit-field">
            <div className="label-icon-row">
              <label>Laundry Status</label>
              <FaRegEdit className="edit-icon" />
            </div>

            <Col className='tags-align'>
              {/* Render laundry status with conditional styling */}
              <div
                className={`tags laundry-status ${laundryStatus ? 'grey-out' : 'highlight'
                  }`}
              >
                {laundryStatus ? 'In Laundry' : 'Available'}
              </div>
            </Col>
          </div>

          <div className='delete-item'>
            <Button className='delete-button' onClick={handleDeleteItem}> Delete Item </Button>
          </div>

        </Col>
      </div>



    </Container>
  );
}

export default ItemEditView;
