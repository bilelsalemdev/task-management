import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    UsersModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {} 