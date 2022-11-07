import React from "react";
import axios from "axios";
import { Cart, Row, Col, Button, Divider, Avtar } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useCategory from "../../hooks/useCategory";
import useLatestPosts from "../../hooks/useLatestPosts";
import Title from "antd/lib/skeleton/Title";

dayjs.extend(relativeTime);
export default function postsBycategory({ posts, category }) {
  return (
    <>
      <Head>
        <title>{category.name}</title>
        <meta
          name="description"
          content={`Read latest posts on ${category.name}`}
        />
      </Head>
      <Row gutter={12}>
        <Col sm={24} lg={18} style={{ marginBottom: 12 }}>
          <h1 style={{ textAlign: center }}>Posts in {category.name}</h1>
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.API}/posts-by-category/${params}`
  );
  return {
    props: {
      posts: data.posts,
      category: data.category,
    },
  };
}
