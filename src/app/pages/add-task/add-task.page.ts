import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { DataService } from '../../services/data.service';
import { RemoteConfigService } from '../../services/remote-config.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    public dataService: DataService,
    public remoteConfigService: RemoteConfigService,
    private toastController: ToastController
  ) {}

  addCategory() {
    if (this.newCategory.trim()) {
      this.dataService.addCategory({
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
    console.log('Fecha seleccionada:', this.selectedDate);
  }
  addTask() {
    if (
      this.titleTask.trim() &&
      this.selectedDate &&
      this.selectedCategoryId &&
      this.descriptionTask
    ) {
      this.dataService.addTask({
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

  toggleTask(task: Task) {
    this.dataService.toggleTask(task);
  }

  deleteTask(task: Task) {
    this.dataService.deleteTask(task);
  }

  filteredTasks() {
    return this.dataService.tasks;
  }

  getCategoryName(categoryId?: number) {
    const category = this.dataService.categories.find(
      (c) => c.id === categoryId
    );
    return category ? category.name : '';
  }
}
