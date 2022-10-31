import { Col, Row } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";

export default function forgotPassword() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const forgotPasswordRequest = async (values) => {
    //

    try {
      setLoading(true);
      const { data } = await axios.post("/forgot-password", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Code sent. Please check you email.");
        setLoading(false);
        // router.push("/login");
        setVisible(true);
      }
    } catch (err) {
      console.log(err);
      toast.error("Forgot Password failed. Try again.");
      setLoading(false);
    }
  };
  const resetPasswordRequest = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/reset-password", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success(
          "Password changed successfully. Please login with your new password."
        );
        setLoading(false);
        router.push("/signin");
      }
    } catch (err) {
      console.log(err);
      toast.error("Forgot Password failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Forgot Password</h1>
        <Form
          name="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={!visible ? forgotPasswordRequest : resetPasswordRequest}
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

          {visible && (
            <>
              <Form.Item name="resetCode">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter Reset code"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  defaultValue={""}
                  placeholder=" New password"
                />
              </Form.Item>
            </>
          )}

          {/* */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
