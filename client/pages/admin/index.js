import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Row, Col, Divider } from "antd";
import RenderProgress from "../../components/RenderProgress";
import axios from "axios";
function Admin() {
  const [numbers, setNumbers] = useState({});
  useEffect(() => {
    getnumbers();
  }, []);
  async function getnumbers() {
    const { data } = await axios.get("/number");
    setNumbers(data);
  }
  return (
    <AdminLayout>
      <Row style={{ overflow: "hidden" }}>
        <Col span={24}>
          <h1>
            <Divider>Statistics</Divider>
          </h1>
        </Col>
        <Col
          span={12}
          style={{ marginTop: "10px", textAlign: "center", fontSize: "30px" }}
        >
          <RenderProgress
            number={numbers.posts}
            name="posts"
            link="/admin/posts"
          />
        </Col>
        <Col
          span={12}
          style={{ marginTop: "10px", textAlign: "center", fontSize: "30px" }}
        >
          <RenderProgress
            name="comments"
            link="/admin/comments"
            number={numbers.comments}
          />
        </Col>
        <Col
          name="users"
          link="/admin/users"
          span={12}
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
        >
          <RenderProgress name="users" number={numbers.users} />
        </Col>
        <Col
          span={12}
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
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
