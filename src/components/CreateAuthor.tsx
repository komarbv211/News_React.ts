import React, { useState } from "react";
import { Button, Form, Input, Checkbox, message, Row, Col } from "antd";
import { tokenService } from "../services/tokenService";
import { createAuthor } from "../services/authorService"; 
import { Author } from "../models/author";

const CreateAuthor = () => {
  const [isAuthor, setIsAuthor] = useState(false);

  const onFinish = async (values: Omit<Author, "id">) => {
    const userId = tokenService.getPayload()?.id;
    if (!userId) {
      message.error("User is not authenticated!");
      return;
    }

    const authorData: Author = {
      id: 0, 
      fullName: values.fullName,
      pseudonym: values.pseudonym,
      userId: userId,
    };

    try {
      await createAuthor(authorData);
      message.success("Author created successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Failed to create author!");
      }
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="isAuthor" valuePropName="checked">
        <Checkbox onChange={(e) => setIsAuthor(e.target.checked)}>
          Register as an Author
        </Checkbox>
      </Form.Item>

      {isAuthor && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please input your full name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Pseudonym" name="pseudonym">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
              Register
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default CreateAuthor;
