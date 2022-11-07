import { Progress } from "antd";
import CountTo from "react-count-to";
import Link from "next/link";

const RenderProgress = ({ number = 0, name = "default", link = "#" }) => {
  return (
    <Link href={link}>
      <a style={{ textAlign: "center" }}>
        <Progress
          strokeWidth={6}
          style={{ color: "white !important", fontSize: "40px !important" }}
          type="circle"
          strokeColor={{ "0%": "#4481eb", "100%": "#04befe" }}
          percent={100}
          format={() => <CountTo to={number} speed={number * 100} />}
        />
        <p style={{ marginTop: "15px", color: "#666", fontSize: "25px" }}>
          {name.toUpperCase()}
        </p>
      </a>
    </Link>
  );
};
export default RenderProgress;
