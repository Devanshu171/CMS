import { useEffect, useState, useContext } from "react";
import { Row, Col, Button, List } from "antd";
import AuthorLayout from "../../../components/layout/AuthorLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { PostContext } from "../../../context/post";
import { useRouter } from "next/router";
import PostsList from "../../../components/posts/PostsList";
import { AuthContext } from "../../../context/auth";

function Posts() {
  const [post, setPost] = useContext(PostContext);
  const [auth, setAuth] = useContext(AuthContext);

  // hook
  const router = useRouter();

  const { posts } = post;

  useEffect(() => {
    if (auth?.token) fetchPosts();
  }, [auth?.token]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/post-by-author");
      setPost((prev) => ({ ...prev, posts: data }));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    // console.log("EDIT POST", post);
    return router.push(`/author/posts/${post.slug}`);
  };

  const handleDelete = async (post) => {
    // console.log("DELETE POST", post);
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/post/${post._id}`);
      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <Button type="primary">
            <Link href="/author/posts/new">
              <a>
                <PlusOutlined /> Add New
              </a>
            </Link>
          </Button>
          <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>
          <PostsList
            post={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </AuthorLayout>
  );
}

export default Posts;
