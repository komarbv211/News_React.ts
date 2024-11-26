import { News } from "./news";

export interface Category{
    id: number;
    name: string;
    news: News[];
}
export interface CategoryOption {
    value: number;
    label: string;
}