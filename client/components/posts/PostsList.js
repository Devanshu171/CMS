import { List } from "antd";

const PostsList = ({ post, handleDelete, handleEdit }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={post}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a onClick={() => handleEdit(item)}>Edit</a>,
            <a onClick={() => handleDelete(item)}>Delete</a>,
          ]}
        >
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
};

export default PostsList;
