import { useState, useEffect } from "react";
import axios from "axios";

const useLatestPosts = () => {
  const [latestPosts, setlatestPosts] = useState([]);
  useEffect(() => {
    getpost();
  }, []);
  const getpost = async () => {
    try {
      const { data } = await axios.get("/posts/1");
      setlatestPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  return { latestPosts };
};
export default useLatestPosts;
