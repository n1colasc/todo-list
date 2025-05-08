import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

import { AppComponent } from './app.component';
import { MenuComponent } from './presentation/components/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/app/core/environments/environment';
import { UpdateTaskUseCase } from './domain/use-cases/tasks/update-task.use-case';
import { TASK_REPOSITORY } from './domain/repositories/task.repository';
import { CategoryDataSource } from './data/datasources/localstorage/category.datasource';
import { TaskDataSource } from './data/datasources/localstorage/task.datasource';
import { CATEGORY_REPOSITORY } from './domain/repositories/category.repository';
import { ToggleTaskUseCase } from './domain/use-cases/tasks/toggle-task.use-case';
import { GetTasksUseCase } from './domain/use-cases/tasks/get-tasks.use-case';
import { GetCategoriesUseCase } from './domain/use-cases/categories/get-categories.use-case';
import { CreateTaskUseCase } from './domain/use-cases/tasks/create-task.use-case';
import { DeleteTaskUseCase } from './domain/use-cases/tasks/delete-task.use-case';
import { CreateCategoryUseCase } from './domain/use-cases/categories/create-category.use-case';
import { DeleteCategoryUseCase } from './domain/use-cases/categories/delete-category.use-case';
import { UpdateCategoryUseCase } from './domain/use-cases/categories/update-category.use-case';

registerLocaleData(localeEsCO);

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetTasksUseCase,
    ToggleTaskUseCase,
    UpdateTaskUseCase,
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskDataSource,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryDataSource,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-CO' },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings = {
        minimumFetchIntervalMillis: 10000,
        fetchTimeoutMillis: 60000,
      };
      return remoteConfig;
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
