import axios from 'axios';
import { News, NewsFormFields } from '../models/news';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNews = async (): Promise<News[]> => {
  const response = await axios.get<News[]>(`${API_BASE_URL}/News/GetAll`);
  return response.data;
};

export const getNewsById = async (id: number): Promise<News> => {
  const response = await axios.get<News>(`${API_BASE_URL}/News/GetById/${id}`);
  return response.data;
};

export const createNews = async (news: News): Promise<void> => {
  await axios.post(`${API_BASE_URL}/News/Create`, news);
};

export const updateNews = async ( news: NewsFormFields): Promise<void> => {
  await axios.put(`${API_BASE_URL}/News/Update`, news);
};

export const deleteNews = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/News/Delete/${id}`);
};
