import { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Input, List, Modal } from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { AuthContext } from "../../context/auth";
import localizedFormat from "dayjs/plugin/localizedFormat";
import toast from "react-hot-toast";
import CommentForm from "./commentForm";
dayjs.extend(localizedFormat);
function UserComments() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [keyword, setKeyword] = useState("");
  //update
  const [loading, setLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState([]);
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  // hook
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
    }
  }, [auth?.token]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/user-comments`);
      console.log(data);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    // console.log("DELETE POST", post);
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/comment/${comment._id}`);
      if (data?.ok) {
        setComments(comments.filter((c) => c._id !== comment._id));
        toast.success("Comment deleted successfully.");
      } else {
        toast.error("Failed to delete comment. try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/comment/${selectedComment._id}`, {
        content,
      });
      fetchComments();
      toast.success("Comment updated successfully.");
      setVisible(false);
      setLoading(false);
    } catch (err) {
      toast.error("failed to update comment.Try again.");
      setLoading(false);
      console.log(err);
    }
  };
  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );
  return (
    <>
      <Row>
        <Col span={24}>
          <h1 style={{ marginTop: 15, fontSize: "25px" }}>
            {comments.length} Comments
          </h1>
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
                    <a>view</a>
                  </Link>,
                  <a
                    onClick={() => {
                      setSelectedComment(item);
                      setVisible(true);
                      setContent(item.content);
                    }}
                  >
                    edit
                  </a>,
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
        <Col span={24}>
          <Modal
            open={visible}
            title="Edit Comment"
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <CommentForm
              handleSubmit={handleSubmit}
              loading={loading}
              comment={content}
              setComment={setContent}
            />
          </Modal>
        </Col>
      </Row>
    </>
  );
}

export default UserComments;
