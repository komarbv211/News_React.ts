import { Author } from "./author";

export interface News {
    id:number;
    title: string;
    description: string;
    fullText: string;
    publishDate: string; 
    categoryId: number;
    categoryName?:string; 
    authorId: number;
    authorName?:string; 
    images?: string;
    author?: Author;

}
export interface NewsFormFields {
    id:number;
    title: string;
    description: string;
    fullText: string;
    publishDate: string; 
    categoryId: number;
    authorId: number;
    images?: File | null;
    author?: Author
}

