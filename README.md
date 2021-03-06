# Software Documentation
This document explains and illustrates characteristics and capabilities of the system, covering into the following topics:

1. [Requirements](#requirements)
2. [System Architecture and Design](#architecture-and-design)
3. [Technical Documentation](#technical-documentation)

## Requirements
Design and develop a website to allow people to post their service requests and allow service providers to bid on the services. The website is free to both clients and service providers and is not involved with (making or receiving) payments for the services. The key requirements of the website are described below.

### User
Any (registered and non-registered) user can perform at least the following tasks:

| Task                                | Description |
|:----------------------------------- |:----------- |
| Search service requests             | As a user, I want to search services requests by keyword so that I can find specific service requests. |
| Create an account                   | As a user, I want to create an account and become a registered user so that I can post a service request, bid on a service request, or do both. |
| View comments to a client           | As a user, I want to view comments and ratings which service providers gave to a client so that I can compare clients. |
| View comments to a service provider | As a user, I want to view comments and ratings which clients gave to a service provider so that I can compare service providers. |

### Client
Clients are registered users who can perform at least the following tasks:

| Task                                            | Description |
|:----------------------------------------------- |:----------- |
| Create a service request                        | As a client, I want to create a service request so that I can find a service provider. |
| Update a service request                        | As a client, I want to update my service request so that I can provide the latest information. |
| Close a service request                         | As a client, I want to close my service request so that I let service providers know that I have accepted an offer. |
| Receive a bid from a provider                   | As a client, I want to receive an offer from a service provider so that I can get pricings and compare them with other offers by other service providers. |
| View service requests                           | As a client, I want to view all of my service requests (including closed requests) so that I can view current or historical information. |
| Write a review to a service provider            | As a client, I want to post a comment and rating to a service provider which completed my service request so that I can voice my opinion and improve the quality of their work. |

### Service provider
Service providers are registered users who can perform at least the following tasks:

| Task                        | Description |
|:--------------------------- |:----------- |
| Bid on a service request    | As a service provider, I want to bid on service request so that the client can communicate with me. |
| View bid history            | As a service provider, I want to view all of my bids I have placed so that I can keep track of and/or update my bids. |
| Write a review to a client  | As a service provider, I want to post a comment and rating to a client after I have finished the client's service request so that I can voice my opinion and improve the quality of their work. |

### Other notes
Registered users can function as a client and/or a service provider. In other words, they can manage service requests, bid on a service request, manage bids, and write reviews for both types of users.

## System Architecture and Design
![System Architecture](https://i.imgur.com/BZAavVA.png)

### Database Design
![Database Design](http://i.imgur.com/NwRl1Ns.png)
- Wanted to segregate sensitive user info like email and password - stored them in MongoDB.
- All other data is stored on MySQL.

## Technical Documentation

### Node Package Manager (NPM)
Node.js has a package manager called Node Package Manager. We have used the following NPM modules in our project:
  1. [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
  2. [body-parser](https://www.npmjs.com/package/body-parser)
  3. [express](https://www.npmjs.com/package/express)
  4. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  5. [mongoose](https://www.npmjs.com/package/mongoose)
  6. [morgan](https://www.npmjs.com/package/morgan)
  7. [mysql](https://www.npmjs.com/package/mysql)

### Authentication and Security
Authentication is performed using Node.js and MongoDB. During registration, passwords are encrypted using bcrypt, one of the best password hashing algorithms, so that our users' passwords are safe from hackers. Our program also utilizes JSON Web Tokens (JWT) for session management, which have many benefits over cookies. JWTs prevents cross-domain (CORS) issues and cross site request forgery (CSRF). JWTs are signed tokens that are stateless and are stored only on the client side - freeing up space in the back-end and allowing ease of scaling.

### REST APIs
The back-end consists of REST APIs that allow HTTP methods to GET, POST, PUT, and DELETE calls. The REST API in this project was developed with the express framework. Some API endpoints require authentication, especially many of our POST routes. This helps keep our data intact and prevents malicious users from sending data.

### AngularJS
Because we have set up a REST API back-end, we need something on the front-end to make HTTP requests. This particular project utilizes Angular, which makes calling HTTP request easy as it will automatically update data with its two-way binding. Angular allows the project to be built like a Single Page Application (SPA) by providing front-end routing.

## User Interface
This section briefly explains the user interface for the web application.

### Home page
Users navigate to the sign up page and login page. Users can also search for available service requests through the search bar found below the navigation bar in the main content area. Optionally, they can click on the 'or browse services' button to view all service requests. Below the search feature talks briefly about what the web application has to offer to potential customers. At the end of the page, there is a footer displaying dummy links to give the home page a similar look and feel as other web services and e-commerce websites.

### Sign up page
Users will sign in with the following information:
- First name
- Last name
- Email address
- Password
Users are uniquely identified using their email address which cannot be changed once the account has been created for that user.

### Log in page
Users will log in using their email and password.

### Dashboard
When users log in, they will be directed to their dashboard displaying the following features:

####1. Profile information
- Profile picture
- First name
- Last name
- Email address
- Address
- Phone number

####2. User's statistics
- Number of Reviews
- Overall Rating

####3. Service Requests
This panel is used for viewing both current and past service requests. Each service request will have the following information:
- Title of the service
- Date in which the service request was created
- Status of the service request
  - Open
  - Closed
- Number of bids available for that service request

####4. Service Bids
This panel is used for viewing both current and service bids. Each bid will have the following information:
- Title of the service
- Name of the client requesting the service
- Status of the service request
  - Pending: The client is still in the process of accepting/declining your bid.
  - Declined: The client has declined your bid.
  - Accepted: The client has accepted your bid.
- The price amount placed for the bid on the service request (in US dollars)
- The price rate placed for the bid on the service request
  - Fixed
  - Hourly
  - Needs more information

### Viewing another user
Other users can be viewed by clicking on their names in the the service request or service bid on the dashboard page. When viewing a user they will be able to see the following information:
- Profile picture
- First name
- Last name
- Email address
- Address (if available)
- Phone number (if available)
- List of review

### Update profile
The user can update the following information:
- First name
- Last name
- Password
- Address
- Phone number

The user has two actions available which will take them back to the dashboard once either action is executed:
- Save profile information
- Cancel profile changes (if any)

### Create a new service request
The user is required to enter the following information:
- Title
- Description

The user has two actions available which will take them back to the dashboard once either action is executed:
- Create new service request
- Cancel creating the service request

### Viewing a service request
The user can view the following information when they click 'view' on a service request in the 'Service Requests' panel of the dashboard page.
- Title of the service
- Request created on
- Status
- Description
- List of service providers and their bids

Each bid in the service request will have the following information:
- Name of the service provider
- The rate the service provider is charging (if any)
  - Fixed
  - Hourly
  - Needs more information
- The dollar amount the service provider is charging (if any)
- Any note for the client to read

The user has the option to accept or decline each bid in the service request. Their choices will be reflected on the service provider's end in the 'Service Bids' panel of the dashboard page.

### Update a service request
The user can update the following information:
- Title
- Description
- Status
  - Open
  - Closed

The user has two actions available which will take them back to the previous page once either action is executed:
- Update the service request
- Cancel updating the service request

### Bid on a service request
The user will need to search for an open service request using the search feature provided in the 'Service Bids' panel under the heading. Once they reach the search results and there are open service requests available, the user can view one of the service requests and place a bid on the selected request. From here the user has two actions available:
- Place bid
- Cancel

### Updating a bid on a service request
The user can update their bids (if the bid is still pending) by navigating to the 'Service Bids' panel on the dashboard page and viewing any pending bid. Afterwards the user can update their bid information. Optionally, they can remove their bid on the 'Service Bids' panel on the dashboard page.

### Writing a review to a client
After the service provider's bid is accepted, they will be able to write a review about their client for the service performed by going back to the accepted bid in the 'Service Bids' panel. They will provide the following information:
- Rating
- Title of the review
- Comments

When writing the review the service provider will know who they are writing a review for and for what service.

The service provider has two actions available:
- Post review
- Cancel

### Writing a review to a service provider
After the client has accepted a service provider's bid, they will be able to write a review about their service provider for the service performed by going back to the closed service request in the 'Service Requests' panel.
- Rating
- Title of the review
- Comments

When writing the review the service provider will know who they are writing a review for and for what service.

The service provider has two actions available:
- Post review
- Cancel
