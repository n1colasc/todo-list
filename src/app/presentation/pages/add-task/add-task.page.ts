import { Component, OnInit } from '@angular/core';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { RemoteConfigService } from '../../../core/services/remote-config.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleTaskUseCase } from 'src/app/domain/use-cases/tasks/toggle-task.use-case';
import { DeleteTaskUseCase } from 'src/app/domain/use-cases/tasks/delete-task.use-case';
import { GetTasksUseCase } from 'src/app/domain/use-cases/tasks/get-tasks.use-case';
import { CreateTaskUseCase } from 'src/app/domain/use-cases/tasks/create-task.use-case';
import { CreateCategoryUseCase } from 'src/app/domain/use-cases/categories/create-category.use-case';
import { GetCategoriesUseCase } from 'src/app/domain/use-cases/categories/get-categories.use-case';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class AddTaskPage implements OnInit {
  titleTask = '';
  descriptionTask = '';
  selectedCategoryId?: number;
  showFunc: boolean = false;
  selectedDate: string | null = null;
  newCategory = '';
  constructor(
    public getTasksUseCase: GetTasksUseCase,
    public createTaskUseCase: CreateTaskUseCase,
    public toggleTaskUseCase: ToggleTaskUseCase,
    public deleteTaskUseCase: DeleteTaskUseCase,
    public createCategoryUseCase: CreateCategoryUseCase,
    public getCategoriesUseCase: GetCategoriesUseCase,
    public remoteConfigService: RemoteConfigService,
    private toastController: ToastController
  ) {}

  addCategory() {
    if (this.newCategory.trim()) {
      this.createCategoryUseCase.execute({
        id: Date.now(),
        name: this.newCategory,
      });
      this.presentToast('top', 'Categoría agregada exitosamente!');
      this.newCategory = '';
    }
  }
  async ngOnInit() {
    this.showFunc = await this.remoteConfigService.isFeatureEnabled(
      'AddTaskIsEnabled'
    );
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: 'success',
    });

    await toast.present();
  }
  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }
  addTask() {
    if (
      this.titleTask.trim() &&
      this.selectedDate &&
      this.selectedCategoryId &&
      this.descriptionTask
    ) {
      this.createTaskUseCase.execute({
        id: Date.now(),
        title: this.titleTask,
        description: this.descriptionTask,
        date: this.selectedDate || '',
        completed: false,
        categoryId: this.selectedCategoryId,
      });
      this.presentToast('top', '¡Tarea agregada exitosamente!');
      this.titleTask = '';
      this.descriptionTask = '';
      this.selectedDate = '';
      this.selectedCategoryId = undefined;
    }
  }

  toggleTask(task: TaskEntity) {
    this.toggleTaskUseCase.execute(task);
  }

  deleteTask(task: TaskEntity) {
    this.deleteTaskUseCase.execute(task);
  }

  filteredTasks() {
    return this.getTasksUseCase.execute();
  }
  getCategories(){
    return this.getCategoriesUseCase.execute();
  }
  getCategoryName(categoryId?: number) {

    const category = this.getCategoriesUseCase
      .execute()
      .find((c) => c.id === categoryId);
    return category ? category.name : '';
  }
}
