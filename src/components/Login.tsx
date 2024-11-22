import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import API from '../services/accountsService';
import { tokenService } from '../services/tokenService';
import { LoginField } from '../models/accounts';
import { useAccountContext } from '../hooks/useAccountContext';

const Login: React.FC = () => {

    const { setAccount } = useAccountContext();

   const onFinish: FormProps<LoginField>['onFinish'] = (values) => {
    console.log('Success:', values);

    API.post("login", values)
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                tokenService.save(res.data.accessToken);
                message.success("Login successful!");
                setAccount(tokenService.getPayload());
            }
        })
        .catch(err => {
            if (err.response && err.response.data) {
                message.error(err.response.data.Message || "Login failed. Please check your email or password.");
            } else {
                message.error("An unexpected error occurred.");
            }
        });
};

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Login Into Your Account</h2>

            <Form
                name="basic"
                // labelCol={{ span: 6 }}
                // wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600, margin: "auto" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item<LoginField>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<LoginField>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<LoginField>
                    name="remember"
                    valuePropName="checked"
                    style={{ textAlign: "center" }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default Login;