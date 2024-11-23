export default class Task {
    constructor(name, dueDate, priority, status) {
        this._name = name;
        this._dueDate = dueDate;
        this._priority = priority;
        this._status = status;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (newName !== '') this._name = newName;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(newDueDate) {
        if (newDueDate !== '') this._dueDate = newDueDate;
    }

    get priority() {
        return this._priority;
    }

    set priority(newPriority) {
        if (newPriority !== '') this._priority = newPriority;
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        if (newStatus !== '') this._status = newStatus;
    }
};