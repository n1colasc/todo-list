import { Injectable } from '@angular/core';
import { Category } from '../../dto/category.model';
import { CategoryRepository } from 'src/app/domain/repositories/category.repository';

/**
 * Servicio principal para la gestión de datos de la aplicación.
 * Maneja el almacenamiento local de categorías usando localStorage.
 *
 * @description
 * Este servicio proporciona métodos para:
 * - Almacenar y recuperar categorías
 * - Realizar operaciones CRUD en categorías
 * - Persistir datos en localStorage
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryDataSource implements CategoryRepository {
  /** Lista de categorías almacenadas */
  categories: Category[] = [];

  constructor() {
    this.load();
  }

  /**
   * Agrega una nueva categoría
   * @param category - La categoría a agregar
   */
  add(category: Category) {
    this.categories.push(category);
    this.save();
  }

  /**
   * Elimina una categoría
   * @param category - La categoría a eliminar
   */
  delete(category: Category) {
    this.categories = this.categories.filter((c) => c.id !== category.id);
    this.save();
  }

  /**
   * Obtener las categorías
   */
  get() {
    return this.categories;
  }

  /**
   * Carga categorías desde localStorage
   */
  private load() {
    const categories = localStorage.getItem('categories');
    if (categories) this.categories = JSON.parse(categories);
  }

  /**
   * Guarda el estado actual de categorías en localStorage
   */
  private save() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.load();
  }

  /**
   * Actualiza una categoría existente
   * @param updatedCategory - La categoría con los datos actualizados
   */
  update(updatedCategory: Category) {
    const index = this.categories.findIndex((t) => t.id === updatedCategory.id);
    if (index > -1) {
      this.categories[index] = updatedCategory;
      this.save();
    }
  }
}
