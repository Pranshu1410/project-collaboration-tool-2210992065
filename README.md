# Project Collaboration Tool

A full-stack web application designed to make group projects smoother, more organized, and transparent for everyone involved.

## 🚩 What's This All About?
Managing group projects is chaotic—tasks in chats, random sheets for status, and no real accountability. This Project Collaboration Tool brings every aspect—users, teams, projects, tasks, notifications—into a single, easy-to-use platform.

*Key Highlights:*
- Assign work, track progress, and view project history all in one place.
- Ensure everyone knows their responsibility and current project status.

---

## 🛠️ Tech Stack

- *Backend:* Node.js & Express.js
- *Authentication:* JWT using Passport.js
- *Database:* MongoDB (with Mongoose)
- *Email Service:* (Planned) Nodemailer
- *Real-time updates:* (Planned) Socket.io
- *Frontend:* React.js

---

## 💡 Core Features

### 1. User Authentication
- Signup/login with role-based access using JWT.
- Roles:  
  - *Admin:* Full control  
  - *Project Manager:* Create/manage teams, projects, tasks  
  - *Team Member:* View/update assigned tasks

### 2. Teams & Projects
- Create and join teams.
- Teams can have multiple members & linked projects.

### 3. Task Management
- Projects have tasks; each assigned to one or more users.
- Tasks carry title, description, status (To Do → In Progress → Completed).

### 4. Activity Timeline
- Every important action logged with user and timestamp.
- Enables full transparency & easy tracking.
- (Planned) Email & real-time notifications for task assignment/status changes.

---

## 📚 Database Structure

- *users*: name, email, password, role
- *teams*: name, creator, members
- *projects*: title, team
- *tasks*: title, project, assignedUsers, status, description
- *user_tasks*: maps users to tasks (many-to-many)
- *activity_logs*: "User X updated task Y at time Z"

*Relationships:*
- A user can be in multiple teams
- Teams have multiple users/projects
- Each project has many tasks
- All changes and assignments are tracked and can trigger notifications

# 🧑‍💻 Teamwork & Task Division

Our team of four divided the entire backend system in a systematic and modular way, ensuring every feature was handled thoroughly and by a dedicated owner.

## 🔥 Task Breakdown by Team Member

| Team Member | Files/Modules Handled | Description |
|-------------|-----------------------|-------------|
| *Pranshu* (Leader) | authcontroller.js, user.js, authroute.js, authmiddleware.js | Designed and implemented complete authentication & user module using JWT; protected private routes and set up login/signup APIs. |
| *Krishna* | projectcontroller.js, project.js, projectroutes.js | Built the project management module: project creation, management, linking projects to teams, and respective APIs. |
| *Paras*   | teamcontroller.js, team.js, teamroute.js           | Developed all team-related features—team creation, joining, adding members, and related routes/controllers/models. |
| *Aastha*  | taskcontroller.js, task.js, taskroute.js           | Managed the entire task workflow: create, assign, update, and move tasks between statuses; ensured each task is well-logged and linkable to users. |

> *We worked by splitting each domain/module, built it locally, created feature branches, and then pushed code in parts to keep project history clear.*

---

## 🎯 Assignment Process & Best Practices

- We started with a team discussion and sketched out our database models and API routes.
- We set up a shared GitHub repository with a distinct branch for each feature/module.
- Everyone worked daily on their domain and made frequent, clear commits.
- PRs (Pull Requests) were made feature-wise to keep project integration smooth.
- *For transparency*, every action (task assignment, status change) is logged via the activity log.

---

## 🚀 Next Steps (Planned)

- *Nodemailer* for email notifications
- *Socket.io* for real-time user updates
- Additional features and improvement based on feedback

---

## 👥 Team Credits

- *Aastha Bhatia*
- *Pranshu* (Leader)
- *Krishna Mehta*
- *Paras*
