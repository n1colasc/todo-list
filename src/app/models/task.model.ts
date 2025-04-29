
export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
    categoryId?: number;
  }
  