import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";

import AuthorNav from "../nav/AuthorNav";
const { Content } = Layout;
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
function AuthorLayout({ children }) {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // setLoading(true);
    // if (auth?.user?.role !== "Admin") {
    //   router.push("/");
    // } else {
    //   setLoading(false);
    // }
    if (auth?.token) getCurrentAuthor();
    // else if (!auth.user) router.push("/");
  }, [auth?.token]);

  const getCurrentAuthor = async () => {
    console.log("im here at admin check point");
    try {
      const { data } = await axios.get("/current-author");
      console.log(data);
      setLoading(false);
    } catch (err) {
      router.push("/");
      console.log(err);
    }
  };
  return loading ? (
    <LoadingToRedirect />
  ) : (
    <Layout>
      <AuthorNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
export default AuthorLayout;
