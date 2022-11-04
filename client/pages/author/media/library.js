import AuthorLayout from "../../../components/layout/AuthorLayout";
import MediaLibrary from "../../../components/media/mediaLibrary";
import { Row, Col } from "antd";

function MediaaLibrary() {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary show={true} page={"author"} />
        </Col>
      </Row>
    </AuthorLayout>
  );
}
export default MediaaLibrary;
