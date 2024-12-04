import Task from './Task';
export default class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (newName !== '') this._name = newName;
    }

    removeTask(index) {
        if (index > -1 && index < this._tasks.length) {
            this._tasks.splice(index, 1);
        } else {
            throw new Error('Invalid index');
        }
    }

    addTask(task) {
        if (task instanceof Task) this._tasks.push(task);
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(newTasks) {
        if (newTasks !== '') this._tasks = newTasks;
    }
};