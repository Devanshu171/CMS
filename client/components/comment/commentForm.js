import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Input, Button } from "antd";
const { TextArea } = Input;
const CommentForm = ({ comment, handleSubmit, loading, setComment }) => {
  return (
    <>
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows="4"
      />
      <Button
        loading={loading}
        onClick={() => handleSubmit()}
        style={{ marginTop: 4 }}
        type="primary"
        disabled={comment === ""}
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
