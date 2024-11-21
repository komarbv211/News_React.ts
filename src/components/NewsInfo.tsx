import { LeftOutlined } from '@ant-design/icons';
import { Image, Tag, Skeleton, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { News } from '../models/news';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Params = {
    id: string;
};

export default function NewsInfo() {
    const [newsItem, setNewsItem] = useState<News | null>(null);
    const { id } = useParams<Params>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<News>(`${API_BASE_URL}/News/GetById/${id}`)
            .then(response => setNewsItem(response.data))
            .catch(error => console.error("Error fetching news:", error));
    }, [id]);

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            {
                newsItem ? (
                    <div>
                        <h2>{newsItem.title}</h2>
                        <Tag color="blue">Published: {new Date(newsItem.publishDate).toLocaleDateString()}</Tag>
                        <p>Category ID: {newsItem.categoryId}</p>
                        <p>Author: {newsItem.author?.fullName || "Unknown"}</p>
                        <hr />
                        {newsItem.images && (
                            <Image
                                width={200}
                                src={newsItem.images}
                                alt={newsItem.title}
                            />
                        )}
                        <p>{newsItem.description}</p>
                        <p>{newsItem.fullText}</p>
                    </div>
                ) : (
                    <Space direction="vertical" size="large">
                        <Skeleton.Input active />
                        <Skeleton paragraph={{ rows: 2 }} active />
                        <Skeleton.Image />
                    </Space>
                )
            }
        </div>
    );
}
