# Workflow

## Running the Project:

* Clone the reposatory
* Cmd the root directory and input: docker-compose up --build
* Once you see the sign of: app listening at http://localhost:3000 ✓
* The Aplication can be observed on the link. 


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

## Testing

### Swagger

## Front-end

* In order to make this functionality more accessible we created a link in the side bar (of course only for this purpose as this is not a good practice in case the website would go professionaly live).

* Swagger option 



## User

### Front-end User

* Users are separated by 3 categories (guests, users and admins).
* So the front end needs to be responsive and display the proper information for each of the user types.
* Guest are the lower level the aplication has, they will only be able to search for poi's and have access to the user authentication features(login, signup and recover password).
* Users are everyone that holds an account and has logged in to the website, in adition they will be able to add poi's, and have access to the poi page (where all the poi's are displayed), they will also be able to access their profile page and edit their details.
* Admins are the top level users they are able to perform eveything in the website, haviung access to the users page where they can list all the users and delete them.
* To achieve this I created a responsive top and side bar that displays the propers options for each user(any forced attemp to access pages are delt in the back end).
* When a user login the top bar will hide the user authentication options and will display the current users name giving the user the oiption to acess it's profile page and logout.

### Back-end User

* Olah needs to write what you have done so far in the back end


## Point of Interest 

### Cleint side Interest

* In the main page the poi's will be displayed in a map with some pins marking their location, they will also be displayed under the map as form of stickers with the information (this sticker are clickable redirecting the map to the selected poi).
* It is possible to add a poi by clicking on the map and a form to enter the poi ditails will apear, after that the user will have the option to add a picture to the poi.
* Also a page to display all the poi's was created, this page will allow the users to see all the poi's information as well as delete them.

### Server side Point of Interest

* Boyszy


### Terms and Conditions and Apache Licence

* There are a pages to display the terms and conditions for the website, this being accessed in the signup form in a mandatory check box that users will need to verify before signing up.
* The Apache License page can be accessed in the side bar where users are able to verify the licence before using our website


