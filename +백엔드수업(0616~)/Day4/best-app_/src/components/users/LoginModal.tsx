import type { ChangeEvent, FormEvent } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useAuthStore } from "../../stores/authStore";
import type { AuthUser } from "../../stores/authStore";
import { useState, useRef } from "react";

interface LoginMoadlProps {
  show: boolean;
  setShowLogin: (show: boolean) => void;
}

export default function LoginModal({ show, setShowLogin }: LoginMoadlProps) {
  const [loginUser, setLoginUser] = useState<{ email: string; passwd: string }>(
    { email: "", passwd: "" }
  );
  const loginAuthUser = useAuthStore((s) => s.loginAuthUser);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal show={true} centered onHide={() => setShowLogin(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="p-4 mx-auto" xs={10} sm={10} md={8}></Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="email"
                onChange={handleChange}
                value={loginUser.email}
                ref={emailRef}
                placeholder="ID (email)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="passwd"
                onChange={handleChange}
                value={loginUser.passwd}
                ref={passwdRef}
                placeholder="Password"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="outline-success">
                Login
              </Button>
            </div>
          </Form>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
