import { Injectable } from '@angular/core';
import { Task } from '../../dto/task.model';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';

/**
 * Servicio principal para la gestión de datos de la aplicación.
 * Maneja el almacenamiento local de tareas usando localStorage.
 *
 * @description
 * Este servicio proporciona métodos para:
 * - Almacenar y recuperar tareas
 * - Realizar operaciones CRUD en tareas
 * - Persistir datos en localStorage
 */
@Injectable({
  providedIn: 'root',
})
export class TaskDataSource implements TaskRepository {
  /** Lista de tareas almacenadas */
  tasks: Task[] = [];

  constructor() {
    this.load();
  }

  /**
   * Agrega una nueva tarea a la lista
   * @param task - La tarea a agregar
   */
  add(task: Task): void {
    this.tasks.push(task);
    this.save();
  }

  /**
   * Elimina una tarea de la lista
   * @param task - La tarea a eliminar
   */
  delete(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.save();
  }

  /**
   * Obtener las tareas
   */
  get() {
    return this.tasks;
  }

  /**
   * Carga tareas desde localStorage
   */
  private load() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks = JSON.parse(tasks);
  }

  /**
   * Guarda el estado actual de tareas en localStorage
   */
  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.load();
  }

  /**
   * Alterna el estado de completado de una tarea
   * @param task - La tarea a modificar
   */
  toggle(task: Task) {
    task.completed = !task.completed;
    this.save();
  }

  /**
   * Actualiza una tarea existente
   * @param updatedTask - La tarea con los datos actualizados
   */
  update(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.save();
    }
  }
}
