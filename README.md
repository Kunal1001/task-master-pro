<h1 align="center" id="title">Task Master Pro</h1>

<p align="center"><img src="https://socialify.git.ci/Kunal1001/task-master-pro/image?font=Source%20Code%20Pro&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Circuit%20Board&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">Task-master-pro is a task management tool which provides the admin and normal user functionality. With this tool admin can join registered user into projects and assign them tasks.</p>

<h2>🚀 Demo</h2>

[Click me](https://www.linkedin.com/feed/update/urn:li:ugcPost:7212099074123063296/)

<h2>Project Screenshots:</h2>

<img src=".\assets\Screenshot 2024-06-27 190442.png" alt="project-screenshot" width="720" height="420/">

<img src=".\assets\Screenshot 2024-06-27 190508.png" alt="project-screenshot" width="720" height="420/">

<img src=".\assets\Screenshot 2024-06-27 190742.png" alt="project-screenshot" width="720" height="420/">

<img src=".\assets\Screenshot 2024-06-27 190708.png" alt="project-screenshot" width="720" height="420/">

<img src=".\assets\Screenshot 2024-06-27 190725.png" alt="project-screenshot" width="720" height="420/">

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Admin-Roles
*   Project-segregation
*   Task-assignment
*   Multi-user-support
*   Easy-to-use
*   User/admin-Registration

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repo :</p>

```
https://github.com/Kunal1001/task-master-pro.git
```

<p>2. Install Dependencies for Server and Client :</p>

```
npm i
```

<p>3. Set Up DataBase in pgadmin</p>

```
-- Create Data Base
CREATE DATABASE taskmanager

-- User table
CREATE TABLE IF NOT EXISTS users (
  username varchar(20),
  email varchar(40) primary key unique,
  userrole varchar(10),
  password text
);

-- projects and task table
CREATE TYPE tasks AS(
	touser varchar(40),
	content text,
	createdon date,
	iscompleted bool
);

CREATE TABLE IF NOT EXISTS projects (
  projectid serial primary key unique,
  projectname text unique,
  createdby varchar(40),
  createdon date,
  tasks tasks[]
);

```

<p>4. Run server</p>

```
nodemon index.js
```

<p>5. Run client</p>

```
npm run dev
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   ReactJs
*   NodeJs
*   Express
*   Postgresql
*   Postman
*   Passport
*   Axios
*   React-Router

<h2>💖Like my work?</h2>

If you like my work don't forget to give me a Star. Thank you!
