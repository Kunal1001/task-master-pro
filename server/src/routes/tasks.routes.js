import { Router } from "express";
import { 
    addTask,
    createProject,
     getAdminProjects, 
     getSingleAdminProjects, 
     getUserProject, 
     getUserTasks, 
     taskDone
    } from "../controllers/tasks.controller.js";

const taskRouter = Router()

taskRouter.route("/admin/get/projects").get(getAdminProjects)
taskRouter.route("/admin/get/single/project").get(getSingleAdminProjects)
taskRouter.route("/user/get/projects").get(getUserProject)
taskRouter.route("/user/get/projects/tasks").get(getUserTasks)
taskRouter.route("/admin/post/projects").post(createProject)
taskRouter.route("/admin/post/projects/task").post(addTask)
taskRouter.route("/user/projects/task/comleted").post(taskDone)

export {taskRouter}