import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
  ) {}

  async getDashboardStats(userId: string) {
    const [
      taskStats,
      assignedTasks,
      allProjects,
      allUsers,
    ] = await Promise.all([
      this.tasksService.getTaskStatistics(),
      this.tasksService.findByUser(userId),
      this.projectsService.findAll(),
      this.usersService.findAll(),
    ]);

    const userProjects = allProjects.filter(project => project.managerId === userId);
    
    return {
      taskStats,
      recentTasks: assignedTasks.slice(0, 5),
      projectCount: allProjects.length,
      userCount: allUsers.length,
      managedProjects: userProjects.length,
      assignedTasksCount: assignedTasks.length,
    };
  }
} 