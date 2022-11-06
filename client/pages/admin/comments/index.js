import { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Input, List } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { AuthContext } from "../../../context/auth";
import localizedFormat from "dayjs/plugin/localizedFormat";
import loadCustomRoutes from "next/dist/lib/load-custom-routes";
import toast from "react-hot-toast";
dayjs.extend(localizedFormat);
function Comments() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  // hook
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
      getTotal();
    }
  }, [auth]);
  useEffect(() => {
    if (page > 1) {
      fetchComments();
      getTotal();
    }
  }, [page]);
  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/comments/${page}`);
      console.log(data);
      setComments([...comments, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getTotal = async () => {
    const count = await axios.get("/comment-count");
    setTotal(count.data);
  };
  const handleDelete = async (comment) => {
    // console.log("DELETE POST", post);
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/comment/${comment._id}`);
      if (data?.ok) {
        getTotal();
        setComments(comments.filter((c) => c._id !== comment._id));
        toast.success("Comment deleted successfully.");
      } else {
        toast.error("Failed to delete comment. try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <h1 style={{ marginTop: 15, fontSize: "25px" }}>{total} Comments</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
          <br />
          <List
            itemLayout="horizontal"
            dataSource={filteredComments}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                actions={[
                  <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
                    view
                  </Link>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta
                  description={`On ${item?.postId?.title}   |   ${
                    item?.postedBy?.name
                  } |   ${dayjs(item.CreatedAt).format("L LT")} `}
                  title={item.content}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          {comments.length < total && (
            <Button
              size="large"
              loading={loading}
              type="primary"
              onClick={() => setPage(page + 1)}
            >
              Load More
            </Button>
          )}
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Comments;
