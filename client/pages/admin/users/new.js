import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, Button, Input, Checkbox, Select } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import generator from "generate-password";

const NewUser = () => {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState(generator.generate({ length: 6 }));
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // fuction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      // console.table({ name, email, website, password, role, checked });

      const { data } = await axios.post("/create-user", {
        name,
        email,
        website,
        password,
        role,
        checked,
      });
      //
      if (data?.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setLoading(false);
        toast.success("User created successfully.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Signup failed. Try again.");
      setLoading(false);
    }
  };
  // show form
  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6} style={{ textAlign: "center" }}>
          <h1 style={{ margin: "20px 0px 0px 0px", fontSize: "20px" }}>
            Add new user
          </h1>
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
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setPassword(generator.generate({ length: 6 }))}
              type="default"
              size="large"
              style={{ margin: "10px 0px 10px 0px" }}
            >
              Generate password
            </Button>
            <Input.Password
              name="password"
              style={{ margin: "10px 0px 10px 0px" }}
              value={password}
              size="large"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Select
            defaultValue="Subscriber"
            style={{ margin: "10px 0px 10px 0px", width: "100%" }}
            onChange={(e) => setRole(e)}
          >
            <Select.Option value="Subscriber">Subscriber</Select.Option>
            <Select.Option value="Author">Author</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Send the new user an email about their acount.
          </Checkbox>
          <Button
            style={{ margin: "10px 0px 10px 0px" }}
            onClick={handleSubmit}
            type="default"
            loading={loading}
            block
          >
            Submit
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default NewUser;
