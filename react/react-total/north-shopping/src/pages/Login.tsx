import React, { useState } from "react";
import Title from "../components/Title";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import "./scss/form.scss";

const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // 변경되지 않은 것은 기존 값으로, 변경된 값만 변경
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: form.email,
      password: form.password,
    };
    login(user, navigate);
  };

  return (
    <div className="container">
      <div className="content-inner">
        <Title title="로그인" />
        <form onSubmit={handleSubmit} className="form">
          <p>
            <input type="text" name="email" required onChange={handleChange} />
          </p>
          <p>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </p>
          <p className="btn">
            <button className="black-btn" type="submit">
              로그인
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
