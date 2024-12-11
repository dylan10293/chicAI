import './AddTags.css';

import { useState } from 'react';

function AddTagsView() {
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    if (tag) {
      console.log(`New tag added: ${tag}`);
      setTag('');
    } else {
      alert('Tag cannot be empty!');
    }
  };

  return (
    <div className="add-tag-container">
      <input
        type="text"
        className="add-tag-input"
        placeholder="Enter Tag Name"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button className="add-tag-button" onClick={handleAddTag}>
        Add
      </button>
    </div>
  );
}

export default AddTagsView;
