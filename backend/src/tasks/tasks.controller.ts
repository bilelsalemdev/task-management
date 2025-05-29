import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserRole } from "../users/entities/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskResponseDto } from "./dto/task-response.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "./entities/task.entity";
import { TasksService } from "./tasks.service";

@ApiTags("tasks")
@Controller("tasks")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new task",
    description:
      "Creates a new task with the provided details. Requires authentication.",
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({
    description: "The task has been successfully created.",
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.tasksService.create(createTaskDto);
    return this.mapToResponseDto(task);
  }

  @Get()
  @ApiOperation({
    summary: "Get all tasks",
    description:
      "Retrieves a list of all tasks. Can be filtered by query parameters.",
  })
  @ApiOkResponse({
    description: "List of tasks retrieved successfully.",
    type: [TaskResponseDto],
  })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.findAll();
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get task by ID",
    description: "Retrieves a single task by its unique identifier.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the task to retrieve",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiOkResponse({
    description: "Task retrieved successfully.",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: "Task not found" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async findOne(@Param("id") id: string): Promise<TaskResponseDto> {
    const task = await this.tasksService.findOne(id);
    return this.mapToResponseDto(task);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a task",
    description: "Updates an existing task with the provided data.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the task to update",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({
    description: "Task updated successfully.",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: "Task not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.update(id, updateTaskDto);
    return this.mapToResponseDto(task);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: "Delete a task",
    description:
      "Deletes a task. Only admins and managers can perform this action.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the task to delete",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiOkResponse({ description: "Task deleted successfully." })
  @ApiForbiddenResponse({ description: "Insufficient permissions" })
  @ApiNotFoundResponse({ description: "Task not found" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.tasksService.remove(id);
  }

  /**
   * Maps a Task entity to a TaskResponseDto
   * @param task The task entity to map
   * @returns A TaskResponseDto
   */
  private mapToResponseDto(task: Task): TaskResponseDto {
    return plainToInstance(TaskResponseDto, {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      // Since Task entity doesn't have createdBy, we'll use the assigned user or fallback to 'system'
      createdBy: task.assignedUser?.id || "system",
      assignedTo: task.assignedUser?.id,
      projectId: task.projectId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  @Get("project/:projectId")
  @ApiOperation({
    summary: "Get tasks by project ID",
    description: "Retrieves all tasks associated with a specific project.",
  })
  @ApiParam({
    name: "projectId",
    description: "The ID of the project to get tasks for",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiOkResponse({
    description: "Tasks retrieved successfully.",
    type: [TaskResponseDto],
  })
  @ApiNotFoundResponse({ description: "Project not found" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async findByProject(
    @Param("projectId") projectId: string
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.findByProject(projectId);
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  @Get("user/:userId")
  @ApiOperation({
    summary: "Get tasks by user ID",
    description: "Retrieves all tasks assigned to a specific user.",
  })
  @ApiParam({
    name: "userId",
    description: "The ID of the user to get tasks for",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiOkResponse({
    description: "Tasks retrieved successfully.",
    type: [TaskResponseDto],
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async findByUser(
    @Param("userId") userId: string
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.findByUser(userId);
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  @Patch(":id/status")
  @ApiOperation({
    summary: "Update task status",
    description: "Updates the status of a specific task.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the task to update",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: Object.values(TaskStatus),
          description: `The new status for the task. Possible values: ${Object.values(
            TaskStatus
          ).join(", ")}`,
        },
      },
      required: ["status"],
    },
  })
  @ApiOkResponse({
    description: "Task status updated successfully.",
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: "Task not found" })
  @ApiBadRequestResponse({ description: "Invalid status value" })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async updateStatus(
    @Param("id") id: string,
    @Body("status") status: TaskStatus
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.updateStatus(id, status);
    return this.mapToResponseDto(task);
  }

  @Get("statistics")
  @ApiOperation({
    summary: "Get task statistics",
    description:
      "Retrieves statistics about tasks (count by status, priority, etc.)",
  })
  @ApiOkResponse({
    description: "Statistics retrieved successfully",
    schema: {
      type: "object",
      properties: {
        total: { type: "number", description: "Total number of tasks" },
        byStatus: {
          type: "object",
          additionalProperties: { type: "number" },
          description: "Count of tasks by status",
        },
        byPriority: {
          type: "object",
          additionalProperties: { type: "number" },
          description: "Count of tasks by priority",
        },
        overdue: { type: "number", description: "Number of overdue tasks" },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: "Not authenticated" })
  async getStatistics() {
    return this.tasksService.getTaskStatistics();
  }
}
