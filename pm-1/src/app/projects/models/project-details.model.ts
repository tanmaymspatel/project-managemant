export class ProjectDetails {
    public id?: number;
    public projectName: string;
    public description: string;
    public duration: string;
    public todoList?: TaskList[];
    public activeTaskList?: TaskList[];
    public completedTaskList?: TaskList[];

    constructor(
        projectName: string,
        description: string,
        duration: string,
        todoList: TaskList[],
        activeTaskList: TaskList[],
        completedTaskList: TaskList[],
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

export class TaskList {
    public id: number;
    public taskName: string;
    public priority: string;
    public completedSubTasks?: SubTaskDetails[];
    public totalSubTasks?: SubTaskDetails[];

    constructor(
        id: number,
        subTaskName: string,
        priority: string,
        completedSubTasks: SubTaskDetails[],
        totalSubTasks: SubTaskDetails[],
    ) {
        this.id = id;
        this.taskName = subTaskName;
        this.priority = priority;
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