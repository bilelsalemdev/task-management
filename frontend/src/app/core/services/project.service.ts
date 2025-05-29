import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private api: ApiService) {}

  getAllProjects(): Observable<Project[]> {
    return this.api.get<Project[]>('projects');
  }

  getProjectById(id: string): Observable<Project> {
    return this.api.get<Project>(`projects/${id}`);
  }

  createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Observable<Project> {
    return this.api.post<Project>('projects', projectData);
  }

  updateProject(id: string, projectData: Partial<Project>): Observable<Project> {
    return this.api.put<Project>(`projects/${id}`, projectData);
  }

  deleteProject(id: string): Observable<void> {
    return this.api.delete<void>(`projects/${id}`);
  }

  getProjectTasks(projectId: string): Observable<any> {
    return this.api.get<any>(`projects/${projectId}/tasks`);
  }
}
