# Workflow

## Project  Initiation:

* Formation of a cross-functional DevOps team with a focus on role distribution.
* Definition of project objectives, encompassing a preliminary identification of the technological stack to be utilized.
* Establishment of a collaborative GitHub repository for project development.
* Custom branches have been generated, with an individual branch assigned to each team member.
* Adoption of the Apache license for project licensing and intellectual property management.
* Construction of a feature list and project plan utilizing a visual Kanban approach within the Agile framework using GitHub projects.

## Planning: 

* Conducting research to identify and assess the requisite technologies for the successful implementation of the project.
* Formulating a comprehensive meeting strategy, including the establishment of project timelines and milestones.
* Setting up objectives and deliverables for each sprint.
* Devising a schedule for regular weekly meetings, employing the Scrum Daily Standup format, to facilitate discussions concerning project progress, obstacles encountered, and future plans.


## Deployment with Azure: 

* verify it with Olah!!


## Technology overview:

* To enhance modularity, the project leverages ES6 JavaScript runtimes, resulting in the use of '.mjs' file extensions.

## Containerizing the entire project using Docker:

### Dockerfile: 
* Upon the compilation of the Docker image, the Dockerfile assumes responsibility for defining the command-line instructions for executing the containerized application.
```
FROM node:14
```
* A Node.js image was generated instead of the customary Ubuntu image, streamlining the process by eliminating the need for additional setup steps related to Node.js configuration and dependencies.

### .dockerignore file: 

* By 
```
node_modules
```
excluding node modules, we enhance deployment efficiency and accelerate build times, Docker selectively includes only production code in its images, reducing overall size by excluding unnecessary dependency packages

### docker-compose.yml file

* Maximizing simplicity through automation with Docker Compose.
* This configuration file establishes two containers: one for the database and another for the entire project.
* The database container initiates after the project container 
```
 depends_on:
      - mysql
```
and encompasses all the essential environment variables necessary for establishing a connection.
* Additionally, a volume has been mounted to the database container to ensure data persistence beyond the container's lifecycle.
