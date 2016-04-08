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
- NPM modules used:
..1. bcrypt-nodejs
..2. body-parser
..3. express
..4. jsonwebtokens
..5. mongoose
..6. morgan
..7. mysql
- Authentication
- REST APIs created with express
- angular: views are updated by making HTTP calls to the APIs
- data is passed in json and angular automatically updates views

## User Interface
Each section will provide explanations and illustrations for the feature being described.

### Home page

### Sign up page
Users are uniquely identified using their email address which cannot be changed once the account has been created for that user.

### Log in page
Users will log in using their email and password.

### Dashboard
When users log in, they will be directed to their dashboard displaying the following features:

####1. Profile information
- Profile picture
- First name
- Last name
- Email
- Address
- Phone

####2. User's statistics
- Number of Reviews
- Overall Rating

####3. Service Requests
This panel is used for viewing both current and past service requests. Each service request will have the following information:
- Service heading
- Date in which the service request was created
- Status of the service request
  - Open
  - Closed
- Number of bids available for that service request

####4. Service Bids
This panel is used for viewing both current and past service bids. Each service bid will have the following information:
- Service heading
- Name of the client requesting the service
- Status of the service request
  - Pending
  - Declined
  - Accepted
- The price amount placed for the bid on the service request
- The price rate placed for the bid on the service request
  - Fixed
  - Hourly
  - Needs more information
-

### Update profile

### Create a new service request

### Update a service request

### Close a service request

### Bid on a service request

### Update a bid on a service request

### Writing a review to a client

### Writing a review to a service provider
