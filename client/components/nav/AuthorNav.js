import React, { useState, useEffect } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
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

const AuthorNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  const [active, setActive] = useState("");
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
    getItem("Dashboard", "/author", <SettingOutlined />),
    getItem("Posts", "1", <PushpinOutlined />, [
      getItem("All Posts", "/author/posts", <DesktopOutlined />),
      getItem("Add New", "/author/posts/new", <FileAddOutlined />),
      getItem("Categories", "/author/categories", <UnorderedListOutlined />),
    ]),
    getItem("Media", "2", <CameraOutlined />, [
      getItem("Library", "/author/media/library", <PictureOutlined />),
      getItem("Add New", "/author/media/new", <FileAddOutlined />),
    ]),
    getItem("Comments", "/author/comments", <CommentOutlined />),

    getItem("Profile", "/author/userid", <ProfileOutlined />),
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
export default AuthorNav;
