import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tasks: Task[] = [];
  categories: Category[] = [];

  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.load();
  }

  load() {
    const tasks = localStorage.getItem('tasks');
    const categories = localStorage.getItem('categories');
    if (tasks) this.tasks = JSON.parse(tasks);
    if (categories) this.categories = JSON.parse(categories);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.save();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.save();
  }

  addCategory(category: Category) {
    this.categories.push(category);
    this.save();
  }

  deleteCategory(category: Category) {
    this.categories = this.categories.filter((c) => c.id !== category.id);
    this.save();
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.save();
    }
  }

  updateCategory(updatedCategory: Category) {
    const index = this.categories.findIndex((t) => t.id === updatedCategory.id);
    if (index > -1) {
      this.categories[index] = updatedCategory;
      this.save();
    }
  }
}
