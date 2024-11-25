import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterForm = ({ toggleForm }) => {
	return (
		<div className="w-100">
			<h1 className="mb-3" style={{ fontWeight: "bold" }}>
				Register
			</h1>
			<Form className="mb-3">
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" placeholder="Enter your full name" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter your email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter your password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="reenter-password">
					<Form.Label>Re-enter Password</Form.Label>
					<Form.Control type="password" placeholder="Re-enter your password" />
				</Form.Group>
				<Button variant="primary" type="submit" className="w-100">
					Sign Up
				</Button>
			</Form>
			<div className="text-center">
				<p>Already have an account?</p>
				<Button variant="outline-primary" className="w-100" onClick={() => toggleForm()}>
					Log In
				</Button>
			</div>
		</div>
	);
};

export default RegisterForm;
