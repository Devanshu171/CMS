import React from "react";
import { Form, Row, Col } from "antd";
import ContactForm from "../components/contact";

export default function contact() {
  return (
    <Row>
      <Col span={12} offset={6} style={{ paddingTop: 12 }}>
        <ContactForm />
      </Col>
    </Row>
  );
}
