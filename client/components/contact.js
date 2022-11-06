import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";
const { TextArea } = Input;
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/contact", values);
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Successfully sent.");
        setLoading(false);
        form.resetFields();
      }
    } catch (err) {
      console.log("error=>", err);
      toast.error("falied to send.Please try again!");
      setLoading(false);
    }
  };
  return (
    <div style={{ marginTop: 30, textAlign: "center" }}>
      <h1>Contact Us</h1>
      <Form form={form} name="contact-form" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Your Name"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            {
              type: "email",
            },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input
            value={""}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="message"
          rules={[{ required: true, message: "Please write your message" }]}
        >
          <TextArea placeholder="Your message" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="contact-form-button"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
