import { useState, useContext } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  DatabaseOutlined,
  DatabaseTwoTone,
} from "@ant-design/icons";
const { SubMenu } = Menu;
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";
import ToggleTheme from "./ToggleTheme";
import Link from "next/Link";

const TopNav = () => {
  const [current, setCurrent] = useState("mail");
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const signOut = () => {
    //remove from loacal storage
    localStorage.removeItem("auth");
    // remove fom context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login page
    router.push("/signin");
  };
  // console.log(auth.user);

  const roleBasedLink = () => {
    if (auth?.user?.role === "Admin") {
      return "/admin";
    } else if (auth?.user?.role === "Author") {
      return "/author";
    } else {
      return "/subscriber";
    }
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="mail" icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>CMS</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="post" icon={<DatabaseOutlined />}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </Menu.Item>

      {auth.user === null && (
        <>
          <Menu.Item
            key="signup"
            style={{ marginLeft: "auto" }}
            icon={<UserAddOutlined />}
          >
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="signin" icon={<UserOutlined />}>
            <Link href="/signin">
              <a>Signin</a>
            </Link>
          </Menu.Item>
        </>
      )}
      {auth?.user && (
        <>
          <SubMenu
            key="SubMenu"
            style={{ marginLeft: "auto" }}
            icon={<SettingOutlined />}
            title={auth?.user?.name || Dashboard}
          >
            <Menu.ItemGroup title="Management">
              <Menu.Item key="setting:1">
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="signout" icon={<LogoutOutlined />} onClick={signOut}>
            <a>Signout</a>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="theme">
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
