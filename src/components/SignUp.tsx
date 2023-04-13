import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSignup = (values: SignupFormValues) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <>
      <div style={{ border: "1px solid #ccc", padding: "16px", maxWidth: 400, margin: "7vh auto " }}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <Form layout="vertical" form={form} onFinish={handleSignup}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email address!" }]}>
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
              Sign up
            </Button>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account? <Button type="link">Log In</Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
