import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";

import AdminNav from "../nav/AdminNav";
const { Content } = Layout;
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
function Admin({ children }) {
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
    if (auth?.token) getCurrentAdmin();
    // else if (!auth.user) router.push("/");
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    console.log("im here at admin check point");
    try {
      const { data } = await axios.get("/current-admin");
      console.log(data);
      setLoading(false);
    } catch (err) {
      router.push("/");
      console.log(err);
    }
  };
  return loading ? (
    <div style={{ overflow: "hidden" }}>
      <LoadingOutlined
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          height: "80vh",
          fontSize: "59px",
          color: "#0ae",
        }}
      />
    </div>
  ) : (
    <Layout>
      <AdminNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
export default Admin;
