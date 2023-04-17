import { CloseOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function NotFound() {
  const { user } = useContext(AuthContext);

  return (
    <Content className="not-found" style={{ textAlign: "center", padding: "10rem" }}>
      <div style={{ display: "inline-block" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
            textAlign: "center",
            background: "red",
          }}
        >
          <CloseOutlined style={{ fontSize: "20px", color: "white" }} />
        </div>
      </div>
      <Title level={2} style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        {"Page Not Found :("}
      </Title>
      {/* <Paragraph type="secondary">{"page_not_found_info"}</Paragraph> */}
      <Link to={user ? "/main" : "/signIn"}>
        <Button type="primary" shape="round" style={{ marginTop: "3rem", padding: "0 3rem", backgroundColor: "red" }}>
          {"Return Home"}
        </Button>
      </Link>
    </Content>
  );
}
