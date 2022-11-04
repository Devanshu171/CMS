import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../../../context/auth";
import loadCustomRoutes from "next/dist/lib/load-custom-routes";

export default function AllUsers() {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  // hook
  const router = useRouter();
  const [users, setUser] = useState([]);
  useEffect(() => {
    if (auth?.token) loadUser();
  }, [auth?.token]);
  const loadUser = async () => {
    try {
      const { data } = await axios.get("users");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (user) => {
    try {
      //
      if (user._id === auth.user._id) {
        alert("you can not delete yourself");
        return;
      }
      try {
        const { data } = await axios.delete(`/user/${user._id}`);
        setUser((prev) => prev.filter((u) => u._id !== user._id));
        toast.success("user deleted successfully.");
      } catch (err) {
        console.log(err);
        toast.error("user deletion failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error("user deletion failed.");
    }
  };
  return (
    <AdminLayout>
      <Row>
        <Col span={22} offset={1}>
          <h3>{users?.length} Users</h3>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Link href={`/admin/users/${user._id}`}>
                    <a>edit</a>
                  </Link>,

                  <a
                    disabled={user?._id === auth?.user?._id}
                    onClick={() => handleDelete(user)}
                  >
                    delete
                  </a>,
                ]}
              >
                <Avatar src={user?.image?.url}>{user?.name[0]}</Avatar>
                <List.Item.Meta title={user.name} style={{ marginLeft: 20 }} />
                <List.Item.Meta
                  description={user.email}
                  style={{ marginLeft: "10px" }}
                />
                <List.Item.Meta
                  description={user.role}
                  style={{ marginLeft: "10px" }}
                />
                <List.Item.Meta
                  description={`${user?.posts?.length || 0} Posts`}
                  style={{ marginLeft: "10px" }}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}
