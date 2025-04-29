import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

/**
 * Servicio principal para la gestión de datos de la aplicación.
 * Maneja el almacenamiento local de tareas y categorías usando localStorage.
 * 
 * @description
 * Este servicio proporciona métodos para:
 * - Almacenar y recuperar tareas y categorías
 * - Realizar operaciones CRUD en tareas y categorías
 * - Persistir datos en localStorage
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /** Lista de tareas almacenadas */
  tasks: Task[] = [];
  /** Lista de categorías almacenadas */
  categories: Category[] = [];

  constructor() {
    this.load();
  }

  /**
   * Guarda el estado actual de tareas y categorías en localStorage
   */
  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.load();
  }

  /**
   * Carga tareas y categorías desde localStorage
   */
  load() {
    const tasks = localStorage.getItem('tasks');
    const categories = localStorage.getItem('categories');
    if (tasks) this.tasks = JSON.parse(tasks);
    if (categories) this.categories = JSON.parse(categories);
  }

  /**
   * Agrega una nueva tarea a la lista
   * @param task - La tarea a agregar
   */
  addTask(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  /**
   * Alterna el estado de completado de una tarea
   * @param task - La tarea a modificar
   */
  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.save();
  }

  /**
   * Elimina una tarea de la lista
   * @param task - La tarea a eliminar
   */
  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.save();
  }

  /**
   * Agrega una nueva categoría
   * @param category - La categoría a agregar
   */
  addCategory(category: Category) {
    this.categories.push(category);
    this.save();
  }

  /**
   * Elimina una categoría
   * @param category - La categoría a eliminar
   */
  deleteCategory(category: Category) {
    this.categories = this.categories.filter((c) => c.id !== category.id);
    this.save();
  }

  /**
   * Actualiza una tarea existente
   * @param updatedTask - La tarea con los datos actualizados
   */
  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.save();
    }
  }

  /**
   * Actualiza una categoría existente
   * @param updatedCategory - La categoría con los datos actualizados
   */
  updateCategory(updatedCategory: Category) {
    const index = this.categories.findIndex((t) => t.id === updatedCategory.id);
    if (index > -1) {
      this.categories[index] = updatedCategory;
      this.save();
    }
  }
}
