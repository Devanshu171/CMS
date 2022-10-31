import MediaLibaray from "./mediaLibrary";
import UploadFile from "./uploadFile";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Media = () => {
  return (
    <Tabs>
      <TabPane tab="Upload File" key="1">
        <UploadFile />
      </TabPane>
      <TabPane tab="Media Library" key="2">
        <MediaLibaray />
      </TabPane>
    </Tabs>
  );
};
export default Media;
