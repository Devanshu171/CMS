import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getcategory();
  }, []);
  const getcategory = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  return { categories };
};
export default useCategory;
