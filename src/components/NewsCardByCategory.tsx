import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { GetByIdWithNews } from '../services/categoryService';
import { News } from '../models/news';

const { Meta } = Card;

const NewsCardByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const numericCategoryId = Number(categoryId);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Для зберігання помилок

  useEffect(() => {
    const loadNews = async () => {
      if (!numericCategoryId) return;
  
      setLoading(true);
      setError(null); // Очищаємо попередні помилки
      try {
        const data = await GetByIdWithNews(numericCategoryId);
        
        // Переконатися, що data.news - це масив
        if (Array.isArray(data.news)) {
          setNews(data.news);
        } else {
          console.error('Unexpected format: data.news is not an array');
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error loading news:', error);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    loadNews();
  }, [numericCategoryId]); // Це дозволить перезавантажити новини при зміні категорії
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {news.length > 0 ? (
        news.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{ width: 240, margin: '16px' }}
            cover={
              <img
                alt={item.title}
                src={item.images || '/default-image.jpg'} // Вкажіть шлях до резервного зображення
                style={{ height: '150px', objectFit: 'cover' }}
              />
            }
            onClick={() => navigate(`/news/${item.id}`)}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
        ))
      ) : (
        <div>No news available for this category.</div>
      )}
    </div>
  );
};

export default NewsCardByCategory;
