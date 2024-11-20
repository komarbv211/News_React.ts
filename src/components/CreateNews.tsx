import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select,  message, Spin } from 'antd';
import axios from 'axios';
import { News } from '../models/news';
import { Category } from '../models/category';
import { Author } from '../models/author';
import { useNavigate } from 'react-router-dom';


const CreateNews: React.FC = () => {
  const [news, setNews] = useState<Omit<News, 'images'> & { images?: File }>({
    id: 0,
    title: '',
    description: '',
    fullText: '',
    publishDate: '',
    categoryId: 1,
    authorId: 1,
    images: undefined,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Category[]>(`${API_BASE_URL}Categories/GetAll`);
        setCategories(data);
        if (data.length > 0) {
          setNews((prevState) => ({ ...prevState, categoryId: data[0].id }));
        }
      } catch {
        message.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Author[]>(`${API_BASE_URL}Authors/GetAll`);
        setAuthors(data);
        if (data.length > 0) {
          setNews((prevState) => ({ ...prevState, authorId: data[0].id }));
        }
      } catch  {
        message.error('Failed to load authors');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [API_BASE_URL]);

  const handleCreateNews = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('id', news.id.toString());
    formData.append('title', news.title);
    formData.append('description', news.description);
    formData.append('fullText', news.fullText);
    formData.append('publishDate', new Date().toISOString());
    formData.append('categoryId', news.categoryId.toString());
    formData.append('authorId', news.authorId.toString());
    if (news.images) {
      formData.append('images', news.images);
    }

    try {
      await axios.post(`${API_BASE_URL}/News/Create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('The news has been successfully created!');
      navigate('/news');
    } catch  {
      message.error('An error occurred while creating the news');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setNews((prevState) => ({
        ...prevState,
        images: file,
      }));
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <h2>Creating news</h2>
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          onFinish={handleCreateNews}
          style={{ maxWidth: 600, margin: '0 auto' }}
          initialValues={{
            categoryId: categories.length > 0 ? categories[0].id : 1,
            authorId: authors.length > 0 ? authors[0].id : 1,
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a title!' }]}
          >
            <Input
              value={news.title}
              onChange={handleChange}
              placeholder="Enter a title"
              name="title"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description!' }]}
          >
            <Input
              value={news.description}
              onChange={handleChange}
              placeholder="Enter a description"
              name="description"
            />
          </Form.Item>

          <Form.Item
            label="News text"
            name="fullText"
            rules={[{ required: true, message: 'Please enter the text of the news!' }]}
          >
            <Input.TextArea
              value={news.fullText}
              onChange={handleChange}
              rows={4}
              placeholder="Enter the text of the news"
              name="fullText"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              placeholder="Select a category"
              value={news.categoryId}
              onChange={(value) => setNews({ ...news, categoryId: value })}
            >
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Author"
            name="authorId"
            rules={[{ required: true, message: 'Please select an author!' }]}
          >
            <Select
              placeholder="Select an author"
              value={news.authorId}
              onChange={(value) => setNews({ ...news, authorId: value })}
            >
              {authors.map((author) => (
                <Select.Option key={author.id} value={author.id}>
                  {author.fullName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload image"
            name="images"
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create news
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CreateNews;
