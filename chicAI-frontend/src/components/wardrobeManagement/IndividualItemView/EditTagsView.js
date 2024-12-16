import AddTagsView from './AddTagsView';
import './EditTags.css';
import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { useLocation } from 'react-router-dom';



function EditTagsView({ itemId }) {
  const [tags, setTags] = useState([]);

  const [showAddItems, setShowAddItems] = useState(false);

  // Fetch tags from the backend API when the component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/outfits/wardrobe/${itemId}/tags`);
        const data = await response.json();
        if (response.ok) {
          setTags(data.tags || []);  // Update the tags state with the fetched tags
        } else {
          console.error("Failed to fetch tags:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [itemId]);

  // Show AddItemsView
  const handleAddTagClick = () => {
    setShowAddItems(true);
  };

  // Close AddItemsView
  const handleCloseAddItems = () => {
    setShowAddItems(false);
  };

  const onTagsAdded = () => {
    console.log("Tags updated!");
    setShowAddItems(false); // Hide the AddTag view after adding the tag

    // Re-fetch the tags after adding a new one to update the list
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/outfits/wardrobe/${itemId}/tags`);
        const data = await response.json();
        if (response.ok) {
          setTags(data.tags || []);
        } else {
          console.error("Failed to fetch updated tags:", data.message);
        }
      } catch (error) {
        console.error("Error fetching updated tags:", error);
      }
    };

    fetchTags();
  };


  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div key={index} className="tag">
          {tag}
        </div>
      ))}

      <div className="add-tag-button" onClick={handleAddTagClick}>
        + Add Tag
      </div>

      {/* Conditionally render AddItemsView */}
      {showAddItems && (
        <div className="add-items-modal">
          <IoClose className="close-icon" onClick={handleCloseAddItems} />
          <AddTagsView itemId={itemId} onTagsAdded={onTagsAdded} />
        </div>
      )}

    </div>
  );
}

export default EditTagsView;
