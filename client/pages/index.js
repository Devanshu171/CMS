import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { Row, Col, Button, Divider } from "antd";
import Head from "next/head";
import Link from "next/link";
import FullWidthImage from "../components/pages/FullWidthImage";
import RenderProgress from "../components/RenderProgress";
import useNumbers from "../hooks/useNumbers";
import useLatestPosts from "../hooks/useLatestPosts";
import { ThunderboltOutlined } from "@ant-design/icons";

import useCategory from "../hooks/useCategory";
import ParallaxImage from "../components/pages/ParallaxImage";
import Footer from "../components/pages/Footer";
function Home() {
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPosts();
  const { categories } = useCategory();
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Modern Content Management System -CMS</title>
        <meta
          name="description"
          content="React lated blog posts on web development"
        />
      </Head>
      <FullWidthImage />
      <Row style={{ overflow: "hidden", marginTop: "30px" }}>
        <Col
          span={6}
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
        >
          <RenderProgress
            number={numbers.posts}
            name="posts"
            link="/admin/posts"
          />
        </Col>
        <Col
          span={6}
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
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
          span={6}
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
        >
          <RenderProgress name="users" number={numbers.users} />
        </Col>
        <Col
          span={6}
          style={{ marginTop: "50px", textAlign: "center", fontSize: "30px" }}
        >
          <RenderProgress
            name="categories"
            link="/admin/catogries"
            number={numbers.categories}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ParallaxImage>
            <h2
              style={{
                textAlign: "center",
                fontSize: "74px",
                textShadow: "2px 2px 4px #000000",
                color: "#fff",
              }}
            >
              BLOG POSTS
            </h2>
            <Divider>
              Recent
              <ThunderboltOutlined
                style={{ color: "white", fontSize: "30px" }}
              />{" "}
              Posts
            </Divider>
            <div style={{ textAlign: "center" }}>
              {latestPosts.map((post) => (
                <Link href={`/post/${post.slug}`} key={post._id}>
                  <a>
                    <h3 style={{ color: "white", fontSize: "20px" }}>
                      {post.title}
                    </h3>
                  </a>
                </Link>
              ))}
            </div>
          </ParallaxImage>
        </Col>
      </Row>

      <Row>
        <Col
          span={24}
          style={{ textAlign: "center", marginTop: 80, marginBottom: 80 }}
        >
          <Divider>Categories</Divider>
          <div style={{ textAlign: "center" }}>
            {categories.map((c) => (
              <Link href={`/category/${c.slug}`} key={c._id}>
                <a>
                  <Button style={{ margin: 2 }}>{c.name}</Button>
                </a>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Home;
