import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Task } from '../../models/task.model';
import { Category } from 'src/app/models/category.model';
import { EditTaskModalComponent } from 'src/app/components/edit-task-modal/edit-task-modal.component';
import { ModalController } from '@ionic/angular';
import { EditCategoryModalComponent } from 'src/app/components/edit-category-modal/edit-category-modal.component';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  constructor(
    public dataService: DataService,
    private modalCtrl: ModalController
  ) {}
  searchTerm = '';
  tasks: Task[] = [];
  ngOnInit() {
    this.tasks = this.dataService.tasks;
  }

  trackId(index: number, task: Task): number {
    return task.id;
  }
  trackCategoryId(index: number, category: Category): number {
    return category.id;
  }
  syncTasks(){
    this.tasks = this.dataService.tasks;
  }
  async openEditCategoryModal(category: Category) {
    const modal = await this.modalCtrl.create({
      component: EditCategoryModalComponent,
      componentProps: { category: { ...category } }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.dataService.updateCategory(data);
    }
  }
  async openEditModal(task: Task) {
    const modal = await this.modalCtrl.create({
      component: EditTaskModalComponent,
      componentProps: { task: { ...task } },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.dataService.updateTask(data);
    }
  }
  filteredTasks() {
    return this.tasks;
  }
  filterTasks() {
    if (this.searchTerm.trim() === '') {
      this.syncTasks();
    } else {
      const category = this.dataService.categories.find((v) =>
        v.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.tasks = this.dataService.tasks.filter(
        (task) => task.categoryId === category?.id
      );
    }
  }
  filteredCategories() {
    return this.dataService.categories;
  }
  toggleTask(task: Task) {
    this.dataService.toggleTask(task);
    this.syncTasks();
  }
  getCategoryName(categoryId?: number) {
    const category = this.dataService.categories.find(
      (c) => c.id === categoryId
    );
    return category ? category.name : '';
  }
  deleteTask(task: Task) {
    this.dataService.deleteTask(task);
    this.syncTasks();
  }
  deleteCategory(category: Category) {
    this.dataService.deleteCategory(category);
  }
}
