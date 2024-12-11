import AddTagsView from './AddTagsView';
import './EditTags.css';
import { useState } from 'react';
import { IoClose } from "react-icons/io5";


function EditTagsView() {
  const [tags, setTags] = useState([
    'Casual',
    'Formal',
    'Business-Casual',
    'Party',
  ]);

  const [showAddItems, setShowAddItems] = useState(false);

  // Show AddItemsView
  const handleAddTagClick = () => {
    setShowAddItems(true);
  };

  // Close AddItemsView
  const handleCloseAddItems = () => {
    setShowAddItems(false);
  };

  const addTag = () => {
    const newTag = prompt('Enter a new tag:');
    if (newTag) setTags([...tags, newTag]);
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
          <AddTagsView />
        </div>
      )}

    </div>
  );
}

export default EditTagsView;
