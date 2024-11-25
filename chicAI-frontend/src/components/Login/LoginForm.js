import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = () => {
	return (
		<div className="w-100">
			<h1 className="mb-3" style={{ fontWeight: "bold" }}>
				Login
			</h1>
			<Form className="mb-3">
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter your email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter your password" />
				</Form.Group>
				<Button variant="primary" type="submit" className="w-100">
					Login
				</Button>
			</Form>
			<div className="text-center">
				<p>Don't have an account?</p>
			</div>
			<Button variant="outline-primary" className="w-100">
				Register
			</Button>
		</div>
	)
}

export default LoginForm