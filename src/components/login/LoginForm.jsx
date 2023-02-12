import { useEffect, useRef, useState } from "react";

import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  FormControl,
  Image,
  Row,
} from "react-bootstrap";

import { Form } from "react-router-dom";

import "./LoginForm.css";

// TODO dolozyc useSubmit i przesylanie formularza recznie, dodatkowe czyszczenie pol username i password po submicie
const LoginForm = ({ error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage = error && <Alert variant="danger">{error}</Alert>;

  const handleChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "username") setUsername(value);
    if (event.target.name === "password") setPassword(value);
  };

  return (
    <Form method="POST">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="login-form">
          <Col>
            <Row>
              <Col>
                <Image
                  src="/logo.jpg"
                  width="100px"
                  style={{ marginBottom: "20px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-top-margin col-bottom-margin">
                Logowanie do systemu
              </Col>
            </Row>
            <Row>
              <Col>{errorMessage}</Col>
            </Row>
            <Row>
              <Col className="col-top-margin col-bottom-margin">
                <FloatingLabel label="Podaj nazwę użytkownika">
                  <FormControl
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="label"
                    // ref={usernameInput}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="col-top-margin col-bottom-margin">
                <FloatingLabel label="Podaj hasło">
                  <FormControl
                    name="password"
                    placeholder="label"
                    value={password}
                    onChange={handleChange}
                    type="password"
                    // ref={passwordInput}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="col-top-margin col-bottom-margin">
                <Button type="submit">Zaloguj</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default LoginForm;
