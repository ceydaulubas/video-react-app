import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignUp = () => {
  const { signUp, auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await signUp(values.email, values.password);
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
        Sign Up
      </Title>
      {error && <Alert message="Error:" description={error} style={{ color: "red", fontWeight: "bold" }} type="error" closable />}
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email address!" }]}>
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password should be at least 6 characters", min: 6 }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#13c2c2" }} loading={loading}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        Already have an account?{" "}
        <Button type="link" style={{ color: "#13c2c2" }}>
          <Link to="/login"> Log In</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
