import axios from "axios";
import {Author} from "../models/author"

const API_BASE_URL = import.meta.env.VITE_API_AUTHOR_URL ;

export const fetchNews = async (): Promise<Author[]> => {
  const response = await axios.get<Author[]>(`${API_BASE_URL}GetAll`);
  return response.data;
};

export const getNewsById = async (id: number): Promise<Author> => {
  const response = await axios.get<Author>(`${API_BASE_URL}GetById/${id}`);
  return response.data;
};

export const createNews = async (news: Author): Promise<void> => {
  await axios.post(`${API_BASE_URL}Create`, news);
};

export const updateNews = async ( news: Author): Promise<void> => {
  await axios.put(`${API_BASE_URL}Update`, news);
};

export const deleteNews = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}Delete/${id}`);
};