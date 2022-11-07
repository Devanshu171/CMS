import { useState, useEffect } from "react";
import axios from "axios";

const useNumbers = () => {
  const [numbers, setNumbers] = useState({});
  useEffect(() => {
    getnumbers();
  }, []);
  async function getnumbers() {
    const { data } = await axios.get("/number");
    setNumbers(data);
  }
  return { numbers };
};
export default useNumbers;
