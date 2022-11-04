import React, { useState, useEffect } from "react";
import { Row, Col, Card, Avatar, Button } from "antd";
import Head from "next/head";
const { Meta } = Card;
import axios from "axios";
import Link from "next/link";
export default function Posts({ posts }) {
  const [allPosts, setAllPosts] = useState(posts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTotal();
  }, []);
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/post-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${page}`);
      setAllPosts([...allPosts, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web development, programming etc" />
      </Head>
      <Row gutter={12}>
        {allPosts.map((post) => {
          return (
            <Col xs={24} sm={24} lg={8} xl={8} style={{ margin: "7px 0" }}>
              <Link href={`/post/${post.slug}`}>
                <Card
                  hoverable
                  cover={
                    <Avatar
                      shape="square"
                      style={{ height: "250px" }}
                      src={post.featuredImage?.url || "images/default.jpg"}
                      alt={post.title}
                    />
                  }
                >
                  <Meta title={post.title}></Meta>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>

      {allPosts?.length < total && (
        <Row>
          <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
            <Button
              size="large"
              type="primary"
              loading={loading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}
export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/posts/1`);
  return {
    props: {
      posts: data,
    },
  };

  return;
}
