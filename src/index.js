import './style.css';
import { UIRenderer } from './UIRenderer';
import { ProjectRegistry } from './ProjectRegistry';
import Project from './Project.js';
import Task from './Task.js';

document.addEventListener("DOMContentLoaded", () => {
    const task1 = new Task("One", "Do some stuff", "2024-10-10", "In progress");
    const task2 = new Task("Two", "More stuff", "2025-01-02", "On hold");

    const myProject = new Project("My project");
    myProject.addTask(task1);
    myProject.addTask(task2);

    ProjectRegistry.addProject(myProject);

    UIRenderer.renderProjects(ProjectRegistry.getProjects());

    UIRenderer.renderTasks(myProject);

});
