import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { News } from '../models/news';
import { fetchNews, deleteNews } from '../services/newsService';
import { Link } from 'react-router-dom';
import {AppstoreAddOutlined, DeleteFilled, EditFilled, InfoCircleFilled} from '@ant-design/icons';
const NewsList: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchNews();
      setNewsList(newsData);
    };

    loadNews();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteNews(id);
      setNewsList(newsList.filter(news => news.id !== id));
      message.success('The news has been successfully deleted');
    } catch  {
      message.error('Failed to delete news');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'Images',
      key: 'images',
      render: (_: unknown, item: News) => (
        <img height={50} src={item.images} alt={item.title}></img>
    )},
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: string, record: News) => (
        <span>
          <Button type="link">
            <Link to={`/news/${record.id}`}><InfoCircleFilled/></Link>
          </Button>
          <Button type="link">
            <Link to={`/news/edit/${record.id}`}><EditFilled/></Link>
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.title}?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" variant="outlined" >
                  <DeleteFilled/>
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/news/create"><AppstoreAddOutlined/>Створити новину</Link>
      </Button>
      <Table columns={columns} dataSource={newsList} rowKey="id" />
    </div>
  );
};

export default NewsList;
