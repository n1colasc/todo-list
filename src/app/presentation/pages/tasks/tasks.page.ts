import { Component, OnInit } from '@angular/core';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { CategoryEntity } from 'src/app/domain/entities/category.entity';
import { EditTaskModalComponent } from 'src/app/presentation/components/edit-task-modal/edit-task-modal.component';
import { ModalController } from '@ionic/angular';
import { EditCategoryModalComponent } from 'src/app/presentation/components/edit-category-modal/edit-category-modal.component';
import { GetTasksUseCase } from 'src/app/domain/use-cases/tasks/get-tasks.use-case';
import { UpdateTaskUseCase } from 'src/app/domain/use-cases/tasks/update-task.use-case';
import { ToggleTaskUseCase } from 'src/app/domain/use-cases/tasks/toggle-task.use-case';
import { DeleteTaskUseCase } from 'src/app/domain/use-cases/tasks/delete-task.use-case';
import { GetCategoriesUseCase } from 'src/app/domain/use-cases/categories/get-categories.use-case';
import { UpdateCategoryUseCase } from 'src/app/domain/use-cases/categories/update-category.use-case';
import { DeleteCategoryUseCase } from 'src/app/domain/use-cases/categories/delete-category.use-case';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  constructor(
    public getTasksUseCase: GetTasksUseCase,
    public updateTaskUseCase: UpdateTaskUseCase,
    public toggleTaskUseCase: ToggleTaskUseCase,
    public deleteTaskUseCase: DeleteTaskUseCase,
    public getCategoriesUseCase: GetCategoriesUseCase,
    public updateCategoryUseCase: UpdateCategoryUseCase,
    public deleteCategoryUseCase: DeleteCategoryUseCase,
    private modalCtrl: ModalController
  ) {}
  searchTerm = '';
  tasks: TaskEntity[] = [];
  ngOnInit() {
    this.tasks = this.getTasksUseCase.execute();
  }

  trackId(index: number, task: TaskEntity): number {
    return task.id;
  }
  trackCategoryId(index: number, category: CategoryEntity): number {
    return category.id;
  }
  syncTasks(){
    this.tasks = this.getTasksUseCase.execute();
  }
  async openEditCategoryModal(category: CategoryEntity) {
    const modal = await this.modalCtrl.create({
      component: EditCategoryModalComponent,
      componentProps: { category: { ...category } }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.updateCategoryUseCase.execute(data);
    }
  }
  async openEditModal(task: TaskEntity) {
    const modal = await this.modalCtrl.create({
      component: EditTaskModalComponent,
      componentProps: { task: { ...task } },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.updateTaskUseCase.execute(data);
      this.syncTasks();
    }
  }
  filteredTasks() {
    return this.tasks;
  }
  filterTasks() {
    if (this.searchTerm.trim() === '') {
      this.syncTasks();
    } else {
      const category = this.getCategoriesUseCase.execute().find((v) =>
        v.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.tasks = this.getTasksUseCase.execute().filter(
        (task) => task.categoryId === category?.id
      );
    }
  }
  filteredCategories() {
    return this.getCategoriesUseCase.execute();
  }
  toggleTask(task: TaskEntity) {
    this.toggleTaskUseCase.execute(task);
    this.syncTasks();
  }
  getCategoryName(categoryId?: number) {
    const category = this.getCategoriesUseCase.execute().find(
      (c) => c.id === categoryId
    );
    return category ? category.name : '';
  }
  deleteTask(task: TaskEntity) {
    this.deleteTaskUseCase.execute(task);
    this.syncTasks();
  }
  deleteCategory(category: CategoryEntity) {
    this.deleteCategoryUseCase.execute(category);
  }
}
