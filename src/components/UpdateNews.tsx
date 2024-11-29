import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { News, NewsFormFields } from '../models/news';
import { getNewsById, updateNews } from '../services/newsService';
import { Category } from '../models/category';
import { Author } from '../models/author';


const UpdateNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Categories/GetAll`);
        const authorsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Authors/GetAll`);
        setCategories(categoriesResponse.data);
        setAuthors(authorsResponse.data);

        if (id) {
          const data = await getNewsById(Number(id));
          setNews(data);
          if (data.images) {
            setImagePreview(data.images); 
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error('Failed to load data.');
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (values: NewsFormFields) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('id', id || '');
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('fullText', values.fullText);
      formData.append('categoryId', values.categoryId.toString());
      formData.append('authorId', values.authorId.toString());
  
      if (file) {
        // Додаємо файл, якщо він вибраний
        formData.append('images', file);
      }
  
      // Виклик оновлення новин
      await updateNews(formData as unknown as NewsFormFields);
      message.success('News updated successfully.');
      navigate('/news');
    } catch (error) {
      console.error('Error updating news:', error);
      message.error('Failed to update news.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleImageChange = (file: File) => {
    setFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl); 
  };

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Update News</h2>
      <Form
        initialValues={{
          title: news.title,
          description: news.description,
          fullText: news.fullText,
          categoryId: news.categoryId,
          authorId: news.authorId,
        }}
        onFinish={handleUpdate}
        layout="vertical"
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Text"
          name="fullText"
          rules={[{ required: true, message: 'Please enter the full text!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select placeholder="Select a category">
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
          rules={[{ required: true/*, message: 'Please select an author!' */}]}>
          <Select placeholder="Select an author" disabled={!!news}>
            {authors.map((author) => (
              <Select.Option key={author.id} value={author.id}>
                {author.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<NewsFormFields> label="Image" name="images">
          <Upload
            beforeUpload={(file) => {
              handleImageChange(file); 
              return false; 
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ height: 100, marginTop: 10 }} />}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update News
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateNews;
