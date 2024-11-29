import { News } from "./news";

export interface Author {
    id:number;
    fullName: string;
    pseudonym: string;
    userId: string;
    news?:News[];
  }
  