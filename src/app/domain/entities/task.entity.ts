export class TaskEntity {
  constructor(
    /** Identificador único de la tarea */
    public id: number,
    /** Título o nombre de la tarea */
    public title: string,
    /** Descripción detallada de la tarea */
    public description: string,
    /** Fecha de creación o vencimiento de la tarea */
    public date: string,
    /** Estado de completado de la tarea */
    public completed: boolean,
    /** Identificador opcional de la categoría a la que pertenece la tarea */
    public categoryId?: number
  ) {}
}
