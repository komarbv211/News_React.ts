import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, InfoCircleFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { deleteNews } from "../services/newsService";
import { News } from "../models/news";
import { ProtectedRoute } from "../security/ProtectedRoute";
import CreateAuthor from "./CreateAuthor";
import { filterAuthors } from "../services/authorService";
import { tokenService } from "../services/tokenService";

const AuthorOffice: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadNews = async () => {
    setLoading(true);
    try {
      const payload = tokenService.getPayload();
      const filters: { authorId?: string } = {};
  
      if (payload) {
        filters.authorId = payload.id.toString();
      }
  
      const authors = await filterAuthors(undefined, filters.authorId, true); 
      const news = authors.flatMap((author) =>
        author.news?.map((newsItem: News) => ({
          id: newsItem.id ?? 0,
          title: newsItem.title ?? "Untitled",
          description: newsItem.description ?? "No description",
          publishDate: newsItem.publishDate ?? "",
          fullText: newsItem.fullText ?? "",
          categoryId: newsItem.categoryId ?? 0,
          categoryName: newsItem.categoryName ?? "",
          authorId: author.id,
          authorName: author.fullName,
          images: newsItem.images || "/placeholder.png",
        })) ?? []
      );
      setNewsList(news);
    } catch (error) {
      message.error("Could not get news! " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNews(id);
      message.success("News deleted successfully!");
      setNewsList((prev) => prev.filter((news) => news.id !== id));
    } catch (error) {
      message.error("Failed to delete news! " + error);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (_: unknown, item: News) => (
        <img height={50} src={item.images} alt={item.title} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "AuthorName",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: News) => (
        <span>
          <Button type="link">
            <Link to={`/news/${record.id}`}>
              <InfoCircleFilled />
            </Link>
          </Button>
          <Button type="link">
            <Link to={`/news/edit/${record.id}`}>
              <EditFilled />
            </Link>
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.title}?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div>
        <h1>Author Office</h1>
        <CreateAuthor />
        <div style={{ marginBottom: 16 }}>
          <Button type="primary">
            <Link to="/news/create">
              <AppstoreAddOutlined /> Create News
            </Link>
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={newsList}
          rowKey="id"
          loading={loading}
          bordered
        />
      </div>
    </ProtectedRoute>
  );
};

export default AuthorOffice;
