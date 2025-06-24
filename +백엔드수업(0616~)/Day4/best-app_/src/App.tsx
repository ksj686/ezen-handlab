import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Side from "./components/Side";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostApp from "./pages/PostApp";
import PostView from "./components/posts/PostView";
import PostEdit from "./components/posts/PostEdit";
import SignUpForm from "./components/users/SignUpForm";
import UserList from "./components/users/userList";
import LoginModal from "./components/users/LoginModal";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <>
      <div className="container fluid py-5">
        <BrowserRouter>
          <Row>
            <Col className="mb-5">
              <Header />
            </Col>
          </Row>
          <Row className="main">
            <Col
              xs={12}
              sm={4}
              md={4}
              lg={3}
              className="d-none d-sm-block mt-3"
            >
              <Side setShowLogin={setShowLogin} />
            </Col>
            <Col xs={12} sm={8} md={8} lg={9}>
              {/* 로그인 모달 */}
              <LoginModal show={showLogin} setShowLogin={setShowLogin} />

              {/* 라우트 */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<PostApp />} />
                <Route path="/posts/:id" element={<PostView />} />
                <Route path="/postEdit/:id" element={<PostEdit />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/admin/users" element={<UserList />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col lg={12}></Col>
          </Row>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
