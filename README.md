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