import { useEffect, useState, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Button, Row, Col, List } from "antd";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { PostContext } from "../../../context/post";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
export default function Posts() {
  // post stste
  const router = useRouter();
  const [post, setPost] = useContext(PostContext);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      //
      const { data } = await axios.get("/posts");
      setPost((prev) => ({ ...prev, posts: data }));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async (item) => {
    //
    return router.push(`/admin/posts/${item.slug}`);
  };
  const handleDelete = async (item) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/post/${item._id}`);
      if (data.ok) {
        toast.success("Post deleted successfully.");
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== item._id),
        }));
      } else {
        toast.error("Post deletion failed. Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AdminLayout>
        <Row>
          <Col span={22} offset={1}>
            <Button type="primary">
              <Link href={"/admin/posts/new"}>
                <a>
                  {" "}
                  <PlusOutlined /> Add New
                </a>
              </Link>
            </Button>
            <h1 style={{ margin: "15px 0", fontSize: "30px" }}>
              {post.posts.length} Posts
            </h1>
            <List
              itemLayout="horizontal"
              dataSource={post.posts}
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
            ></List>
          </Col>
        </Row>
      </AdminLayout>
    </div>
  );
}
