import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import Head from "next/head";
const { Meta } = Card;
import axios from "axios";
import Link from "next/link";
export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web development, programming etc" />
      </Head>
      <Row gutter={12}>
        {posts.map((post) => {
          return (
            <Col style={{ margin: "7px 0" }} xs={24} sm={24} lg={8} xl={8}>
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
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/posts`);
  return {
    props: {
      posts: data,
    },
  };

  return;
}
