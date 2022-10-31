import AdminLayout from "../../../components/layout/AdminLayout";
import MediaLibrary from "../../../components/media/mediaLibrary";
import { Row, Col } from "antd";

function MediaaLibrary() {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary show={true} />
        </Col>
      </Row>
    </AdminLayout>
  );
}
export default MediaaLibrary;
