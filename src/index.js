import './style.css';
import Task from './Task';
import Project from './Project';
import ProjectRegistry from './ProjectRegistry';
import UIRenderer from './UIRenderer';
import EventHandler from './EventHandler';

document.addEventListener("DOMContentLoaded", () => {
    const taskOne = new Task("Task one", "2024-01-02", "high", "In Progress");
    const taskTwo = new Task("Task two", "2023-01-04", "medium", "On hold");

    const myProject = new Project("My project");
    const myOtherProject = new Project("My other project");
    myProject.addTask(taskOne);
    myProject.addTask(taskTwo);

    ProjectRegistry.addProject(myProject);
    ProjectRegistry.addProject(myOtherProject);

    UIRenderer.renderProjects();
    EventHandler.setProjectEvents();
})