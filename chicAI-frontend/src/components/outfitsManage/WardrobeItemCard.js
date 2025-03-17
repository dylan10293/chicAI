import React from "react";
import { Card } from "react-bootstrap";

const WardrobeItemCard = ({ item, selected, onClick, layout = "vertical" }) => {
	return (
		<Card
			className={`wardrobe-card ${selected ? "selected-card" : ""} ${layout === "horizontal" ? "horizontal-card" : "vertical-card"}`}
			onClick={onClick}
		>
			<Card.Body className={layout === "horizontal" ? "d-flex align-items-center" : ""}>
				<div className={`image-container ${layout === "horizontal" ? "me-3" : ""}`}>
					<Card.Img
						variant="top"
						src={`https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${item._id}.jpg`}
					/>
				</div>
				<div>
					<Card.Title className="card-title">{item.name}</Card.Title>
					<Card.Text className="card-text">Type: {item.type}</Card.Text>
					<Card.Text className="card-text">Tags: {item.tags.join(", ")}</Card.Text>
				</div>
			</Card.Body>
		</Card>
	);
};

export default WardrobeItemCard;
