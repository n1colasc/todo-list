import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { GetCategoriesUseCase } from 'src/app/domain/use-cases/categories/get-categories.use-case';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EditTaskModalComponent {
  @Input() task: any = {};
  selectedCategoryId?: number;
  selectedDate: string | null = null;
  constructor(private modalCtrl: ModalController, public getCategoriesUseCase: GetCategoriesUseCase) {}

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    this.task.date = this.selectedDate ? this.selectedDate : this.task.date;
    this.modalCtrl.dismiss(this.task);
  }
  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }
  getCategories(){
    return this.getCategoriesUseCase.execute();
  }
  getCategoryName(categoryId?: number) {
    const category = this.getCategories().find(
      (c) => c.id === categoryId
    );
    return category ? category.name : '';
  }
}
