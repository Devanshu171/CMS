import React, { useState, useEffect, useContext } from "react";
import { Menu, Button, Layout } from "antd";
import { AuthContext } from "../../context/auth";
import { useWindowWidth } from "@react-hook/window-size";
import { useRouter } from "next/router";
import {
  PushpinOutlined,
  DesktopOutlined,
  ContainerOutlined,
  SettingOutlined,
  CommentOutlined,
  CameraOutlined,
  UserOutlined,
  BgColorsOutlined,
  ProfileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  PictureOutlined,
  FileAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SubscriberNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  const [active, setActive] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const onlyWidth = useWindowWidth();
  const router = useRouter();
  useEffect(() => {
    typeof window !== "undefined" && setCurrent(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  const activeName = (name) => `${current === name && "active"}`;
  useEffect(() => {
    if (onlyWidth < 700) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [onlyWidth < 700]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Dashboard", "/subscriber", <SettingOutlined />),

    getItem("Comments", "/subscriber/comments", <CommentOutlined />),

    getItem("Profile", `/subscriber/${auth?.user?._id}`, <ProfileOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["2", "3", "1"]}
          activeKey={active}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            console.log(active);
            setActive(key);
            if (key.length > 3) {
              router.push(key);
            }
          }}
        />
      </div>
    </Sider>
  );
};
export default SubscriberNav;
