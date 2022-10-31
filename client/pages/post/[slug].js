import React, { useContext } from "react";
import { Row, Col, Card, Typography } from "antd";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
const { Meta } = Card;
const { Title } = Typography;

export default function SinglePost({ post }) {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content?.substring(0, 160)} />
      </Head>
      <Row>
        <Col xs={24} xl={16}>
          <Card
            cover={
              <img
                src={post?.featuredImage?.url || "/images/default.jpg"}
                alt={post.title}
              />
            }
          >
            <Title>{post.title}</Title>
            <p>
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments
              / in{" "}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>
            <Editor
              dark={theme == "dark"}
              readOnly={true}
              defaultValue={post?.content}
            />
          </Card>
        </Col>
        <Col xs={22} xl={6} offset={1}>
          Sidebar Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Laboriosam fuga sunt doloribus mollitia optio, numquam natus minima
          minus, quibusdam dolorem, autem modi fugit voluptates cupiditate
          reiciendis eos. Doloremque, ipsa nam? Saepe asperiores rerum provident
          nostrum sed quaerat, vel illo consequuntur maxime animi nisi possimus
          repellat ad dicta explicabo dolore magnam! Suscipit et quae
          repellendus id esse aliquid vel quaerat possimus. Consectetur omnis,
          molestias quaerat sapiente, cum ex quasi cumque dolorem quae itaque
          vel inventore autem amet, alias iure libero eaque soluta fugiat facere
          voluptatum! Quos numquam porro quae quia quod. Excepturi at dolore
          voluptatum saepe veritatis officiis in voluptatibus, vero animi
          explicabo, facilis nobis voluptatem ducimus reiciendis velit commodi
          corporis eveniet. Quaerat eum tempora incidunt nemo dignissimos. Eius,
          sit! Omnis! Velit perferendis quis voluptatem, itaque eveniet deserunt
          sed excepturi sunt aperiam culpa placeat temporibus. Possimus quo
          assumenda perspiciatis ut omnis voluptatum aperiam. Enim rem aut
          maxime, quos molestias perspiciatis hic. Doloremque ab nisi, beatae,
          adipisci quas nemo officiis reiciendis explicabo totam nulla ducimus
          harum animi! Minus tenetur enim provident eligendi velit atque quaerat
          aut neque tempora mollitia. Ex, perspiciatis a! Fugit tempore ipsam,
          sequi, quos doloribus ipsa ex tempora dolorum aliquid asperiores
          numquam. Minus id autem rem fugit, doloremque repellendus temporibus
          velit ipsam! Dolore sequi consequuntur non nisi vitae dicta. Esse iste
          nemo quod. Quasi, eos, expedita magnam sapiente soluta minus mollitia
          necessitatibus neque alias dolore magni nulla dolorem adipisci unde
          aspernatur fugiat, ipsum modi harum velit consequatur quia obcaecati.
          Placeat quidem alias a cupiditate quos rerum quae porro magni, ipsam
          molestiae deleniti hic omnis sunt accusamus perspiciatis nihil, nisi
          qui optio suscipit nam totam ipsum! Laudantium aliquid fugit
          accusamus. Maxime corrupti explicabo dolorum at sapiente in eos
          molestiae distinctio delectus, architecto eveniet numquam, odit
          corporis quisquam modi magnam, earum laudantium odio quae est impedit
          iusto tempora? Quisquam, odio reiciendis.
        </Col>
      </Row>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
  return {
    props: {
      post: data,
    },
  };

  return;
}
