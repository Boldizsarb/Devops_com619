# Workflow

## Running the Project:

* Clone the reposatory
* Cmd the root directory and input: docker-compose up --build
* Once you see the sign of: app listening at http://localhost:3000 ✓
* The Aplication can be observed on that link. 


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

* OLAH OLAH OLAH OLAH   


## Technology overview:

* To enhance modularity, the project leverages ES6 JavaScript runtimes, resulting in the use of '.mjs' file extensions.
* Babel used to compile React on the front end. 

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

## SERVER CODE SHOULD COME HERE FILIPPE FILIPPPE FILIPPPE!!!! (sicne teh mvc utulises the server code!)

## MVC Arhitecture 

### Modell

* Interacts with the database.
* ES6 enables the importation of the database module for establishing and terminating connections.
* To prevent collisions or blocking the main thread, all functions are designed as asynchronous (async).
* SQL queries are responsible for handling CRUD (Create, Read, Update, Delete) operations.
* Every query is parameterized to mitigate the risk of SQL injection.
```
'DELETE FROM point_of_interest WHERE id = ?’
```
### Controller: 

* For each static function called on the class, the initial step involves retrieving all variables from the request body.
* It populates a new model instance with these variables, executes the HTTP request, and returns the results in the form of an object.
* Subsequently, the results are parsed into JSON format.
```
res.json(pointsOfInterest);
      or
res.status(500).json({ error: error.message });
```
* This parsing applies to both the actual object and any caught errors.

### Routes: 

* Express.js is employed for defining and managing routes within the application.
* Middleware is configured within the server.mjs file, and all routes are isolated and defined with their own respective prefixes.
```
app.use('/poi', Poirouter);
```
* After specifying the route path, an authentication middleware is added to manage the capabilities of various user types
```
router.get('/pointsOfInterest', isAuthenticated
```
* Then, the appropriate method is invoked from the controller to handle the specific functionality associated with that route
```
router.get('/pointsOfInterest', isAuthenticated,PointsOfInterestController.getAllPointsOfInterestController);
```

## Testing

### Swagger

* To improve accessibility, a sidebar hyperlink was added. 
* Swagger options is used to define the metadata and sources of information required for generating the document.
* To generate a Swagger specification for the API annotations were used in the route files, as follows: 

```
/**
* @swagger  (Annotations)
* /poi/pointsOfInterest:  (route)
*   get:  (get request)
```
* Schema was used to describe the properties and their types for the object and then tags to categorize the APIs
```
/**
 * @swagger
 * components:
 *  schemas:
```
* Each request is associated with a predefined response to provide clear and consistent descriptions.

```
*     responses:
*       201:
*         description: POI created successfully.
```
* Finally, Swagger UI transforms into an interactive format when accessed via the "/api-docs" route.



## User

### Front-end User

* User accounts are categorized into three distinct groups: guests, standard users, and administrators.
* The front-end interface is responsive, dynamically presenting data. 
* User types:
1. **Guests** represent the lowest access level within. Their capabilities are limited to: 
      1. searching for points of interest (POIs) 
      2. utilizing the user authentication functionalities, which include login, signup, and password recovery.
2. **Users** encompass all individuals with registered accounts who have successfully logged into the website. 
      1. They enjoy expanded privileges, including the ability to add new points of interest (POIs), 
      2. Access the POI page showcasing all POIs, 
      3. view their profile page, and make edits to their personal information.
3. **Admins** have unrestricted access and control over all website functions, 
      1. including adding/editing POIs, 
      2. managing user profiles, and overseeing user accounts,
      3. they can view and delete user accounts through the users page.
* Top and side bar are implemented to display appropriate options dinamically for each user based on their access level.

* RENATO RENATO!!!!! please include code snippets and resaons why you have chose that tech or that solution!!! just choose one or two, make up something 


### Back-end User

* Olah OLAH OLAH OLAH needs to write what you have done in the back end


## Point of Interest 

### Cleint side POIs

* Renato RENATO RENATO!! here as well, please include some tecnical explanation! how does stuff work? 
* In the main page the poi's will be displayed in a map with some pins marking their location, they will also be displayed under the map as form of stickers with the information (this sticker are clickable redirecting the map to the selected poi).
* It is possible to add a poi by clicking on the map and a form to enter the poi ditails will apear, after that the user will have the option to add a picture to the poi.
* Also a page to display all the poi's was created, this page will allow the users to see all the poi's information as well as delete them.

### Server side POIs

* The main deviation in the server-side handling of POIs pertains to the management of images.
* 


## Terms and Conditions 

* There are dedicated pages to present the website's terms and conditions, accessible via a mandatory checkbox in the signup form. 
* Users must verify their agreement to these terms before completing the signup process.

### Apache Licence

* The Apache License page is accessible through the sidebar, allowing users to review the license terms before utilizing our website.

### Internationalization (i18n)

<p>This document provides an overview of how internationalization (i18n) is implemented in the application, detailing the use of i18next for managing translations and dynamic content based on the user's language preference.</p>

<h2>Overview</h2>
<p>The application uses i18next, a powerful internationalization framework for JavaScript, to handle the translation of the user interface. This allows the application to support multiple languages, enhancing the user experience for a global audience.</p>

<h2>Including i18next in the Application</h2>
<p>The i18next framework and its HTTP backend are included in the application through script tags in the HMTL file.This inclusion is necessary for the i18n functionality to be available in the the application</p>

```javascript
<script src="https://unpkg.com/i18next/dist/umd/i18next.min.js"></script>
<script src="https://unpkg.com/i18next-http-backend@1.3.1/i18nextHttpBackend.min.js"></script>
<script src="../public/scripts/languageSelector.js"></script>
```

<p> These scripts should be placed at the end of the body section of HTML file to ensure they are loaded and executed correctly</p>

<h2>Requirements</h2>
<p>i18next: The core internationalization framework.</p>
<p>i18next-http-backend: A plugin for i18next to load translations over the network.</p>
<p>Express Server (optional): For serving the translation files if they're static JSON files.</p>

<h2>Using ID's to Map Translation Keys</h2>
<p>One of the key aspects of implementing internationalization in the application is the mapping of HTML element IDs to translation keys. This mapping is essential for dynamic updates of text content in the UI when the language is changed</p>

<h2>Principles of ID to Key Mapping</h2>
<li>Each translatable element in the HTML should have a unique id that corresponds to a translation key in the localization files.</li>
<li>The id should be name in a way that cleraly represents the content or purpose of the element for easier maintenace and readability.</li>

<h2>Example of ID to Key Mapping</h2>
<p>This assumes that translation keys are in "locales/en/translation.json"</p>

```javascript
{
  "Main Page": "Main Page",
  "All Pois (Points of Interest)": "All Pois (Points of Interest)",
  "All Pois (Points of Interest)-loggedin": "All Pois (Points of Interest)",
  "Users": "Users",
  "Welcome": "Welcome",
  "Logout": "Logout",
  "LogIn": "LogIn",
}
```

<p>An HTML element should have a matching ID</p>

```javascript
<span id="Welcome" className="mr-2 d-lg-inline text-gray-600 small">
	Welcome {loggedInUser}
</span>
```

<h2>Best Practices</h2>
<li>Use consistent and clear naming convention for IDs and keys.</li>
<li>Avoid using spaces or special characters in IDs like "camelCase" or "snake_case".</li>
<li>Regularly update the translationKeys array in updateContent to reflect any changes or additions in HTML</li>

<h2>How It Works</h2>
<p>Initialization</p>
<p>i18next is initialized with the following configuration:</p>

```javascript
i18next.use(i18nextHttpBackend).init({
	lng: "en", // Initial language
	fallbackLng: "en", // Fallback language
	debug: true, // Set to false in production
	backend: {
		loadPath: "/locales/{{lng}}/translation.json",
	},
});
```

<p>This setup configures i18next to use the HTTP backend for loading translation files located in the /locales/{{lng}}/ directory.</p>

<h2>Language Selector</h2>
<p>The application includes a language selector, allowing users to switch languages. This is implemented as a dropdown in the user interface:</p>

```javascript
<select
	id="languageSelector"
	defaultValue="en"
	style={{ marginLeft: "5px" }}
	onChange={(e) => changeLanguage(e.target.value)}
>
	<option value="en">English</option>
	<option value="de">Deutsch</option>
	<option value="fr">Français</option>
	<option value="hu">Magyar</option>
	<option value="es">Español</option>
	<option value="pt">Português</option>
	<option value="pl">Polski</option>
</select>
```

<h2>Language Switching</h2>
<p>The changeLanguage function updates i18next's current language and triggers a UI update:</p>

```javascript
function changeLanguage(lng) {
	i18next.changeLanguage(lng, (err) => {
		if (err) {
			console.error("Error changing language:", err);
			return;
		}
		updateContent();
	});
}
```

<h2>Dynamic Content Update</h2>
<p>The updateContent function is responsible for updating the UI elements with the translated text. It iterates over the defined translation keys, finds the corresponding element by its ID and updates the content.</p>

```javascript
function updateContent() {
	const translationKeys = [
		"Main Page",
		"All Pois (Points of Interest)",
		"Users",
		"Welcome",
		"Logout",
		"LogIn",
		// ... rest of keys
	];

	translationKeys.forEach((key) => {
		const element = document.getElementById(key);
		if (element) {
			if (element.tagName === "INPUT" && element.type === "text") {
				element.setAttribute("placeholder", i18next.t(key));
			} else if (element.tagName === "INPUT" && element.type === "submit") {
				element.value = i18next.t(key);
			} else {
				element.textContent = i18next.t(key);
			}
		}
	});
}
```

<p>This funtion is triggered whenever a language change occurs, ensuring that all text content is pdated to reflect the selected language.</p>

<h2>Connection with the Rest of Application</h2>
</p>Server Setup: when using an Express server, ensure it is configured to serve the locales directory.</p>
