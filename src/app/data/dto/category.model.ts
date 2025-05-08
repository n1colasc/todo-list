/**
 * Interfaz que representa una categoría en la aplicación.
 * 
 * @description
 * Una categoría es una forma de organizar y clasificar las tareas.
 * Las categorías permiten:
 * - Agrupar tareas relacionadas
 * - Filtrar tareas por categoría
 * - Organizar mejor el trabajo
 */
export interface Category {
    /** Identificador único de la categoría */
    id: number;
    /** Nombre de la categoría */
    name: string;
}