import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, message, Spin } from 'antd';
import { News } from '../models/news';
import { Category } from '../models/category';
import { Author } from '../models/author';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../services/categoryService';
import { filterAuthors, getAllAuthors } from '../services/authorService';
import { createNews } from '../services/newsService';
import { tokenService } from '../services/tokenService';

const CreateNews: React.FC = () => {
  const [news, setNews] = useState<Omit<News, 'images'> & { images?: File }>({
    id: 0,
    title: '',
    description: '',
    fullText: '',
    publishDate: '',
    categoryId: 1,
    categoryName: '',
    authorId: 1,
    authorName: '',
    images: undefined,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryData, authorData] = await Promise.all([
          getAllCategories(),
          getAllAuthors(),
        ]);
        setCategories(categoryData);
        const payload = tokenService.getPayload();
        const filters: { authorId?: string } = {};
  
        if (payload) {
          filters.authorId = payload.id.toString();
        }
        const authors = await filterAuthors(undefined, filters.authorId);

        setAuthors(authors);

        if (categoryData.length > 0) {
          setNews((prevState) => ({ ...prevState, categoryId: categoryData[0].id }));
        }
        if (authorData.length > 0) {
          setNews((prevState) => ({ ...prevState, authorId: authorData[0].id }));
        }
      } catch {
        message.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      await createNews(formData);
      message.success('News created successfully!');
      navigate('/news');
    } catch {
      message.error('Error occurred while creating the news');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNews((prevState) => ({ ...prevState, images: file }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNews((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h2>Create News</h2>
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          onFinish={handleCreateNews}
          style={{ maxWidth: 600, margin: '0 auto' }}
          initialValues={{
            categoryId: categories.length > 0 ? categories[0].id : 1,
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
              placeholder="Enter title"
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
              placeholder="Enter description"
              name="description"
            />
          </Form.Item>

          <Form.Item
            label="News Text"
            name="fullText"
            rules={[{ required: true, message: 'Please enter the news text!' }]}
          >
            <Input.TextArea
              value={news.fullText}
              onChange={handleChange}
              rows={4}
              placeholder="Enter news text"
              name="fullText"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              placeholder="Select category"
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
              placeholder="Select author"
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

          <Form.Item label="Image">
            <input type="file" onChange={handleFileChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create News
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CreateNews;
