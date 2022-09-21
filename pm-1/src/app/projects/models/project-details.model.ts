export class ProjectDetails {
    public id?: number;
    public projectName: string;
    public description: string;
    public duration: string;
    public todoList?: TaskDetails[];
    public activeTaskList?: TaskDetails[];
    public completedTaskList?: TaskDetails[];

    constructor(
        projectName: string,
        description: string,
        duration: string,
        todoList: TaskDetails[],
        activeTaskList: TaskDetails[],
        completedTaskList: TaskDetails[],
    ) {
        this.projectName = projectName;
        this.description = description;
        this.duration = duration;
        this.todoList = todoList;
        this.activeTaskList = activeTaskList;
        this.completedTaskList = completedTaskList;
    }
}

// ----------------------------------------------------------

export class TaskDetails {
    public id: number;
    public taskName: string;
    public priority: string;
    public status: string;
    public completedSubTasks?: SubTaskDetails[];
    public totalSubTasks?: SubTaskDetails[];

    constructor(
        id: number,
        subTaskName: string,
        priority: string,
        status: string,
        completedSubTasks: SubTaskDetails[],
        totalSubTasks: SubTaskDetails[],
    ) {
        this.id = id;
        this.taskName = subTaskName;
        this.priority = priority;
        this.status = status;
        this.completedSubTasks = completedSubTasks;
        this.totalSubTasks = totalSubTasks;
    }
}


// ----------------------------------------------------------

export class SubTaskDetails {
    public id: number;
    public subTaskName: string;

    constructor(
        id: number,
        subTaskName: string,
    ) {
        this.id = id;
        this.subTaskName = subTaskName
    }
}