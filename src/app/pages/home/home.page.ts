import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RemoteConfigService } from '../../services/remote-config.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../../components/edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  newTask = '';
  selectedCategoryId?: number;
  showFunc: boolean = false;

  get isEmpty() {
    return this.showEmptyTask();
  }

  constructor(
    public dataService: DataService,
    public remoteConfigService: RemoteConfigService,
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

  async openEditModal(task: Task) {
    const modal = await this.modalCtrl.create({
      component: EditTaskModalComponent,
      componentProps: { task: { ...task } }
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.dataService.updateTask(data);
    }
  }
  async ngOnInit() {
    this.showFunc = await this.remoteConfigService.isFeatureEnabled(
      'AddTaskIsEnabled'
    );
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }

  showEmptyTask() {
    return this.filteredTasks()?.length < 1 ? true : false;
  }

  toggleTask(task: Task) {
    this.dataService.toggleTask(task);
  }

  filteredTasks() {
    return this.dataService.tasks.filter((x) => !x.completed);
  }

  getCategoryName(categoryId?: number) {
    const category = this.dataService.categories.find(
      (c) => c.id === categoryId
    );
    return category ? category.name : '';
  }
}
