import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col } from "antd";
import UploadFile from "../../../components/media/uploadFile";

function NewMedia() {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <div style={{ padding: "100px", textAlign: "center" }}>
            <UploadFile redirectToLibrary={true} />
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
}
export default NewMedia;
