/**
 * Interfaz que representa una tarea en la aplicación.
 * 
 * @description
 * Una tarea es una unidad básica de trabajo que puede ser:
 * - Creada por el usuario
 * - Marcada como completada
 * - Asignada a una categoría
 * - Editada o eliminada
 */
export interface Task {
    /** Identificador único de la tarea */
    id: number;
    /** Título o nombre de la tarea */
    title: string;
    /** Descripción detallada de la tarea */
    description: string;
    /** Fecha de creación o vencimiento de la tarea */
    date: string;
    /** Estado de completado de la tarea */
    completed: boolean;
    /** Identificador opcional de la categoría a la que pertenece la tarea */
    categoryId?: number;
}
  