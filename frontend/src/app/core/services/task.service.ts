import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  projectId?: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private api: ApiService) {}

  getAllTasks(): Observable<Task[]> {
    return this.api.get<Task[]>('tasks');
  }

  getTaskById(id: string): Observable<Task> {
    return this.api.get<Task>(`tasks/${id}`);
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    return this.api.post<Task>('tasks', taskData);
  }

  updateTask(id: string, taskData: Partial<Task>): Observable<Task> {
    return this.api.put<Task>(`tasks/${id}`, taskData);
  }

  deleteTask(id: string): Observable<void> {
    return this.api.delete<void>(`tasks/${id}`);
  }

  updateTaskStatus(id: string, status: Task['status']): Observable<Task> {
    return this.api.patch<Task>(`tasks/${id}/status`, { status });
  }

  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.api.get<Task[]>(`tasks/project/${projectId}`);
  }

  getTasksByUser(userId: string): Observable<Task[]> {
    return this.api.get<Task[]>(`tasks/user/${userId}`);
  }
}
