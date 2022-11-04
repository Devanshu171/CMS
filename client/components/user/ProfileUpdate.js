import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { Row, Col, Button, Input, Avatar, Select } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MediaContext } from "../../context/media";
import Media from "../media";
const ProfileUpdate = ({ page = "admin" }) => {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({});

  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState(false);
  useEffect(() => {
    //
    if (auth?.token) currentUser();
  }, [auth, router?.query?.id]);
  const currentUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router?.query?.id}`);
      console.log(data);
      setId(data._id);
      setName(data.name);
      setEmail(data.email);
      setWebsite(data.website);
      setRole(data.role);
      setImage(data?.image);
    } catch (err) {
      console.log(err);
    }
  };
  // fuction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //
      const { data } = await axios.put(`/update-user-by-${page}`, {
        id,
        name,
        email,
        website,
        password,
        role,
        image: media?.selected?._id
          ? media?.selected?._id
          : image?._id
          ? image?._id
          : undefined,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        if (auth?.user?._id === data?._id) {
          setAuth({ ...auth, user: data });
          let fromls = JSON.parse(localStorage.getItem("auth"));
          fromls.user = data;
          localStorage.setItem("auth", JSON.stringify(fromls));
        }
        toast.success("User updated successfully.");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Update failed. Try again.");
      setLoading(false);
    }
  };
  // show form
  return (
    <Row>
      <Col span={12} offset={6} style={{ textAlign: "center" }}>
        <h1 style={{ margin: "20px 0px 0px 0px", fontSize: "20px" }}>
          Update user
        </h1>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          {media?.selected ? (
            <>
              <div style={{ marginBottom: 15 }}></div>
              <Avatar src={media?.selected?.url} size={100} />
            </>
          ) : image ? (
            <>
              <div style={{ marginBottom: 15 }}></div>
              <Avatar src={image.url} size={100} />
            </>
          ) : (
            ""
          )}
        </div>
        <br />
        <Media />

        <Input
          type="text"
          name="name"
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          disabled={true}
          type="email"
          name="email"
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="website"
          name="website"
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          placeholder="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <Input.Password
          name="password"
          style={{ margin: "10px 0px 10px 0px" }}
          value={password}
          size="large"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Select
          value={role}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onChange={(e) => setRole(e)}
        >
          <Select.Option value="Subscriber">Subscriber</Select.Option>
          <Select.Option
            disabled={auth?.user?.role == "Subscriber"}
            value="Author"
          >
            Author
          </Select.Option>
          <Select.Option
            disabled={
              auth?.user?.role == "Subscriber" || auth?.user?.role == "Author"
            }
            value="Admin"
          >
            Admin
          </Select.Option>
        </Select>

        <Button
          style={{ margin: "10px 0px 10px 0px" }}
          onClick={handleSubmit}
          type="default"
          loading={loading}
          block
        >
          Update
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileUpdate;
