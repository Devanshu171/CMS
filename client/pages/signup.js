import { useState, useContext, useEffect } from "react";
import { Col, Row } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
export default function signup() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      const { data } = await axios.post(`/signup`, values);

      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        // dave data in cntext
        setAuth(data);
        // save in localstorage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed up");
        setLoading(false);
        router.push("/admin");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Sugnup failed. Try again.");
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Sigup</h1>
        <Form
          name="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Register
            </Button>
            <br />
            {"  "}Or{" "}
            <Link href="/signin">
              <a>Login now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
