# Software Documentation
This document explains and illustrates characteristics and capabilities of the system, covering into the following topics:

1. System Requirements
2. System Architecture
3. System Design
4. Technical
5. User

## System Requirements
Design and develop a website to allow people to post their service requests and allow service providers to bid on the services. The website is free to both clients and service providers and is not involved with (making or receiving) payments for the services. The key requirements of the website are described below.

### User
Any (registered and non-registered) user can perform at least the following tasks:

| Task                                | Description |
| ----------------------------------- |:----------- |
| Search service requests             | As a user, I want to search services requests by keyword so that I can find specific service requests. |
| Create an account                   | As a user, I want to create an account and become a registered user so that I can post a service request, bid on a service request, or do both. |
| View comments to a client           | As a user, I want to view comments and ratings which service providers gave to a client so that I can compare clients. |
| View comments to a service provider | As a user, I want to view comments and ratings which clients gave to a service provider so that I can compare service providers. |

### Client
Clients are registered users who can perform at least the following tasks:

| Task                                            | Description |
| ----------------------------------------------- |:----------- |
| Create a service request                        | As a client, I want to create a service request so that I can find a service provider. |
| Update a service request                        | As a client, I want to update my service request so that I can provide the latest information. |
| Close a service request                         | As a client, I want to close my service request so that I let service providers know that I have accepted an offer. |
| Receive a bid from a provider                   | As a client, I want to receive an offer from a service provider so that I can get pricings and compare them with other offers by other service providers. |
| View service requests                           | As a client, I want to view all of my service requests (including closed requests) so that I can view current or historical information. |
| Write a review to a service provider            | As a client, I want to post a comment and rating to a service provider which completed my service request so that I can voice my opinion and improve the quality of their work. |

### Service provider
Service providers are registered users who can perform at least the following tasks:

| Task                        | Description |
| --------------------------- |:----------- |
| Bid on a service request    | As a service provider, I want to bid on service request so that the client can communicate with me. |
| View bid history            | As a service provider, I want to view all of my bids I have placed so that I can keep track of and/or update my bids. |
| Write a review to a client  | As a service provider, I want to post a comment and rating to a client after I have finished the client's service request so that I can voice my opinion and improve the quality of their work. |

## System Architecture

## System Design

## Technical

## User








login function uses jsonwebtokens
- read up on why jwts are better than cookies
- backend database uses mongoDB
  - passwords are hashed -> can't view passwords super secure ooohhhh

write about:
- npm modules used
- angular
  - how views are updated, how data gets posted
  - talk about magic of angular
- how routing works back-end and front-end

APIs will need its own section
- REST APIs for everythang
- Authentication
