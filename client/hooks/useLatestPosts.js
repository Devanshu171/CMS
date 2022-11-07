import { useState, useEffect } from "react";
import axios from "axios";

const useLatestPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getpost();
  }, []);
  const getpost = async () => {
    try {
      const { data } = await axios.get("/posts/1");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return { posts };
};
export default useLatestPosts;
