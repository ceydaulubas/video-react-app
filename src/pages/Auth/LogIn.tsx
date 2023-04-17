import React, { useState } from "react";
import { Form, Input, Button, Typography, Checkbox, Alert } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LogIn = () => {
  const { logIn, auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await logIn(values.email, values.password);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);

    console.log("auth", auth);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", maxWidth: 400, margin: "7vh auto " }}>
      {/* <h1 style={{ textAlign: "center" }}>Sign Up</h1> */}
      <Title level={2} style={{ textAlign: "center", textDecoration: "bold" }}>
        Log In
      </Title>
      {error && <Alert message="Error:" description={error} style={{ color: "red", fontWeight: "bold" }} type="error" closable />}
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email address!" }]}>
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password should be at least 6 characters", min: 6 }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#13c2c2" }} loading={loading}>
            Log In
          </Button>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        Need an account?{" "}
        <Button type="link" style={{ color: "#13c2c2" }}>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LogIn;
