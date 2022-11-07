import React from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function FullWidthImage() {
  return (
    <>
      <img
        style={{
          width: "100%",
          height: "500px",
          overflow: "hidden",
          objectFit: "cover",
        }}
        src="/images/b2.jpg"
        alt=""
      />
      <div
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "-420px",
          fontSize: "75px",
          textShadow: "2px 2px 4px #000000",
        }}
      >
        <h1 style={{ color: "white" }}>CMS</h1>
        <p style={{ fontSize: "20px", marginTop: "-110px" }}>
          Content Management System
        </p>
        <Link href="/subscriber">
          <a>
            <Button type="primary" size="large" icon={<SendOutlined />}>
              Explore
            </Button>
          </a>
        </Link>
      </div>
    </>
  );
}
