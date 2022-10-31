import { Col, Row } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";

export default function signin() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    console.log("Success:", values);

    setLoading(true);
    try {
      const { data } = await axios.post("/signin", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // dave data in cntext
        setAuth(data);
        // save in localstorage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed in");
        setLoading(false);

        if (data?.user?.role === "Admin") {
          router.push("/admin");
        } else if (data?.user?.role === "Author") {
          router.push("/author");
        } else {
          router.push("/subscriber");
        }
      }
    } catch (err) {
      console.log("error=>", err);
      toast.error("signin falied try again!");
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Sigin</h1>
        <Form
          name="login-form"
          initialValues={{
            remember: true,
            email: "dev@gmail.com",
            password: "123456",
          }}
          onFinish={onFinish}
        >
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
          <Link href={"/forgot-password"}>
            <a href="">Forgot Password</a>
          </Link>
          <br />
          <br />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Login
            </Button>
            <br />
            {"  "}Or{" "}
            <Link href="/signup">
              <a>Register now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
