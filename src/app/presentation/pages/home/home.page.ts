import { Component } from '@angular/core';
import { RemoteConfigService } from '../../../core/services/remote-config.service';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from '../../components/edit-task-modal/edit-task-modal.component';
import { UpdateTaskUseCase } from 'src/app/domain/use-cases/tasks/update-task.use-case';
import { ToggleTaskUseCase } from 'src/app/domain/use-cases/tasks/toggle-task.use-case';
import { GetTasksUseCase } from 'src/app/domain/use-cases/tasks/get-tasks.use-case';
import { GetCategoriesUseCase } from 'src/app/domain/use-cases/categories/get-categories.use-case';

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
    public updateTaskUseCase: UpdateTaskUseCase,
    public toggleTaskUseCase: ToggleTaskUseCase,
    public getTasksUseCase: GetTasksUseCase,
    public getCategoriesUseCase: GetCategoriesUseCase,
    public remoteConfigService: RemoteConfigService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}
  trackId(index: number, task: TaskEntity): number {
    return task.id;
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

  toggleTask(task: TaskEntity) {
    this.toggleTaskUseCase.execute(task);
  }

  filteredTasks() {
    return this.getTasksUseCase.execute().filter((x) => !x.completed);
  }

  getCategoryName(categoryId?: number) {
    const category = this.getCategoriesUseCase
      .execute()
      .find((c) => c.id === categoryId);
    return category ? category.name : '';
  }
}
