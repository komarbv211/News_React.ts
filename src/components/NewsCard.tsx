import React, { useEffect, useState } from 'react';
import { Card, Alert } from 'antd';
import { News } from '../models/news';
import { fetchNews } from '../services/newsService';
import ProgressSpinner from './ProgressSpinner';
import Image from '../assets/istockphoto.png';
const { Meta } = Card;

const NewsCard: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews();
        setNewsList(newsData);
      } catch (error) {
        console.error('Error loading news:', error);
        setError('Failed to download news. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return <ProgressSpinner />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {newsList.map((news) => (
        <Card
          key={news.id}
          hoverable
          style={{ width: 240, margin: '16px' }}
          cover={
            <img
              alt={news.title}
              src={news.images || Image}
              style={{ height: '150px', objectFit: 'cover' }}
            />
          }
        >
          <Meta title={news.title} description={news.description} />
        </Card>
      ))}
    </div>
  );
};

export default NewsCard;
