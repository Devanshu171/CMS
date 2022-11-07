import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Row, Col, Divider } from "antd";
import RenderProgress from "../../components/RenderProgress";
import axios from "axios";
import userNumbers from "../../hooks/useNumbers";
function Admin() {
  const { numbers } = userNumbers();
  return (
    <AdminLayout>
      <Row style={{ overflow: "hidden", margin: "20px 60px" }}>
        <Col span={24}>
          <h1>
            <Divider>Statistics</Divider>
          </h1>
        </Col>
        <Col
          span={10}
          style={{ marginTop: "80px", textAlign: "center", fontSize: "30px" }}
          offset={1}
        >
          <RenderProgress
            number={numbers.posts}
            name="posts"
            link="/admin/posts"
          />
        </Col>
        <Col
          span={10}
          style={{ marginTop: "80px", textAlign: "center", fontSize: "30px" }}
          offset={1}
        >
          <RenderProgress
            name="comments"
            link="/admin/comments"
            number={numbers.comments}
          />
        </Col>
        <Col
          span={10}
          style={{ marginTop: "80px", textAlign: "center", fontSize: "30px" }}
          offset={1}
        >
          <RenderProgress
            link="/admin/users"
            name="users"
            number={numbers.users}
          />
        </Col>
        <Col
          span={10}
          style={{ marginTop: "80px", textAlign: "center", fontSize: "30px" }}
          offset={1}
        >
          <RenderProgress
            name="categories"
            link="/admin/catogries"
            number={numbers.categories}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}
export default Admin;
