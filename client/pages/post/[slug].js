import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Typography,
  List,
  Avatar,
  Divider,
} from "antd";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import dayjs from "dayjs";
import { AuthContext } from "../../context/auth";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
import CommentForm from "../../components/comment/commentForm";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const { Meta } = Card;
const { Title } = Typography;
import { toast } from "react-hot-toast";
import { ShareSocial } from "react-share-social";
import useCategory from "../../hooks/useCategory";
import useLatestPosts from "../../hooks/useLatestPosts";

export default function SinglePost({ post, postComments }) {
  const [theme, setTheme] = useContext(ThemeContext);
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const { categories } = useCategory();
  const { posts } = useLatestPosts();
  const handleSubmit = async () => {
    if (auth?.user === null) {
      toast.error("Login or Create a new account to post a comment!");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`/comment/${post._id}`, {
        content: comment,
      });
      setComment("");
      setLoading(false);
      toast.success("Comment posted successfully");
      setComments([data, ...comments]);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content?.substring(0, 160)} />
      </Head>
      <Row>
        <Col xs={24} xl={18}>
          <Card
            cover={
              <img
                src={post?.featuredImage?.url || "/images/default.jpg"}
                alt={post.title}
              />
            }
          >
            <Title>{post.title}</Title>
            <p>
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments
              / in{" "}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>
            {/*Socials*/}
            <div style={{ marginTop: "-20px", marginBottom: "15px" }}>
              <ShareSocial
                style={{
                  height: "100px",
                  overflow: "hidden",
                  background: "none",
                }}
                url={typeof window !== "undefined" && window.location.href}
                socialTypes={["facebook", "twitter", "linkedin", "reddit"]}
              />
            </div>
            <Editor
              style={{ boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.2)" }}
              dark={theme == "dark"}
              readOnly={true}
              defaultValue={post?.content}
            />
            <br />

            <CommentForm
              setComment={setComment}
              comment={comment}
              handleSubmit={handleSubmit}
              loading={loading}
            />
            <div style={{ marginBottom: 50 }}></div>
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item._id} id={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>}
                    title={item?.postedBy?.name}
                    description={`${item.content} - ${dayjs(
                      item.createdAt
                    ).fromNow()}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={24} xl={6} offset={0}>
          <Divider>Categories</Divider>
          {categories.map((c) => (
            <Link key={c._id} href={`/category/${c.slug}`}>
              <a>
                <Button style={{ margin: 7 }}>{c.name}</Button>
              </a>
            </Link>
          ))}
          <Divider>Recent Posts</Divider>
          {posts.map((p) => (
            <Link key={p._id} href={`/post/${p.slug}`}>
              <a
                style={{
                  margin: "0px 10px ",
                  display: "block",
                  fontSize: "17px",
                  color: "inherit",
                }}
              >
                {p.title}
              </a>
            </Link>
          ))}
        </Col>
      </Row>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);

  return {
    props: {
      post: data.post,
      postComments: data.comments,
    },
  };

  return;
}
