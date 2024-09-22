export interface ToDoItem {
  id: string;
  time: Date;
  name: string;
}

export interface CreateToDoItem {
  name: string;
}

export interface UpdateToDoItem {
  time?: Date;
  name?: string;
}
