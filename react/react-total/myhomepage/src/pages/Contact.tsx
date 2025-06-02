import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null); // 폼 참조용 ref

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!formRef.current) return;

    emailjs
      .send(
        //sendForm 일때는 formData 대신 formRef.current 사용
        "service_89uychg", // service_id
        "template_8s8b6jx", // template_id
        formData, // 폼요소,
        "HDMSNaBIHRjcRUTeN" // public_key
      )
      .then(
        () => {
          alert("SUCCESS!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("FAILED..." + error.text);
        }
      );
  };

  return (
    <div className="main contact">
      <div className="content-inner">
        <SectionTitle title="Contact Us" />
        <div className="contact-wrap">
          <form ref={formRef} onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="이름"
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="이메일"
                onChange={handleChange}
              />
            </p>
            <p>
              <textarea
                name="message"
                value={formData.message}
                placeholder="메시지를 입력하세요"
                onChange={handleChange}
              />
            </p>
            <button>전송</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
