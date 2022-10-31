import { Layout } from "antd";
import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
const { Content, Sider } = Layout;
import { Form, Input, Row, Col, Button, List, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PostContext } from "../../../context/post";
function Categroies() {
  // context
  const [post, setPost] = useContext(PostContext);
  // state
  const [loading, setLoading] = useState(false);
  const [updatingcategory, setUpdatingcategory] = useState({});
  const [visible, setvisible] = useState(false);
  // from
  const [form] = Form.useForm();
  const [uform] = Form.useForm();
  useEffect(() => {
    getCategories();
  }, []);
  const { categories } = post;
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setPost((prev) => ({ ...prev, categories: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    if (!values.name || values.name.trim().length === 0) {
      toast.error("Please enter a valid category.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/category", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setPost((prev) => ({ ...prev, categories: [data, ...categories] }));
        toast.success("Category added successfully!");
        setLoading(false);
        form.resetFields(["name"]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Create Category.");
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      setPost((prev) => ({
        ...prev,
        categories: categories.filter((cat) => cat._id !== data._id),
      }));
      toast.success("Category deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete Category.");

      console.log(err);
    }
  };
  const handleUpdate = async (item) => {
    setUpdatingcategory(item);
    console.log(updatingcategory.name);
    uform.setFieldValue("newName", item.name);
    setvisible(true);
  };
  const handleEdit = async (item) => {
    setLoading(true);
    if (!item.newName || !item.newName.trim()) {
      toast.error("Please enter a valid Category name.");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.put(`/category/${updatingcategory.slug}`, {
        name: item.newName,
      });
      getCategories();
      setLoading(false);
      setvisible(false);
      setUpdatingcategory({});

      toast.success("Category updated successfully!");
    } catch (err) {
      toast.error("Failed to update Category.");
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <AdminLayout>
      <Row>
        {/* first colum */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Categories</h1>
          <p>Add a category</p>
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Give it a name"
              />
            </Form.Item>
            <Button type="primary " htmlType="submit" loading={loading}>
              Add
            </Button>
          </Form>
        </Col>

        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Categories</h1>
          <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleUpdate(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          ></List>
        </Col>
        <Modal
          title="Update Category"
          open={visible}
          onCancel={() => setvisible(false)}
          footer={null}
        >
          <Form onFinish={handleEdit} form={uform}>
            <Form.Item name="newName">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="New name"
              />
            </Form.Item>
            <Button type="primary " htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form>
        </Modal>
      </Row>
    </AdminLayout>
  );
}
export default Categroies;
