import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EditTaskModalComponent {
  @Input() task: any = {}; // La tarea a editar
  selectedCategoryId?: number;
  selectedDate: string | null = null;
  constructor(private modalCtrl: ModalController, public dataService: DataService) {}

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

  getCategoryName(categoryId?: number) {
    const category = this.dataService.categories.find(
      (c) => c.id === categoryId
    );
    return category ? category.name : '';
  }
}
