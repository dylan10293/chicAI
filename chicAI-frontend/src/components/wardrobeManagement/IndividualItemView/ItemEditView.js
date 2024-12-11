import './ItemEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Stack, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import EditTagsView from './EditTagsView';
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';
import { IoClose } from "react-icons/io5";


function ItemEditView() {
  const location = useLocation();
  const { item, img } = location.state;

  const [showEditTags, setShowEditTags] = useState(false); // State to control EditTagsView visibility

  const handleEditTagsClick = () => {
    setShowEditTags(true); // Show the EditTagsView when clicked
  };

  const handleCloseEditTags = () => {
    setShowEditTags(false); // Hide the EditTagsView
  };

  return (
    <Container fluid>
      <div className="item-edit-container flex-row">
        <Col md={4}>
        <img src={img} alt={item} style={{ width: '300px' }} />
        <h3>{item}</h3>
        </Col>

        <Col md={8} className="edit-fields">
        <div className="edit-field">
          <div className="label-icon-row">
            <label>Tags</label>
            <FaRegEdit className="edit-icon" onClick={handleEditTagsClick}/>
          </div>
          <Col className='tags-align'>
          <div className='tags'>Causual</div>
          <div className='tags'>General</div>
          </Col>
        </div>

        {/* Conditionally render EditTagsView */}
      {showEditTags && (
        <div className="edit-tags-modal">
          <IoClose className="close-icon" onClick={handleCloseEditTags} />
          <EditTagsView />
          {/* <Button className="close-button" onClick={handleCloseEditTags}> */}
            {/* Close */}
          {/* </Button> */}
        </div>
      )}

        <div className="edit-field">
          <div className="label-icon-row">
            <label>Weather</label>
            <FaRegEdit className="edit-icon" />
          </div>
          <Col className='tags-align'>
          <div className='tags'>Winter</div>
          </Col>
        </div>


        <div className="edit-field">
          <div className="label-icon-row">
            <label>Laundry Status</label>
            <FaRegEdit className="edit-icon" />
          </div>
          <Col className='tags-align'>
          <div className='tags'>In Laundry</div>
          </Col>
        </div>

        <div className='delete-item'>
          <Button className='delete-button'> Delete Item </Button>
        </div>

        </Col>
      </div>

      

    </Container>
  );
}

export default ItemEditView;
