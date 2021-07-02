# Daem


The Covid-19 pandemic is straining healthcare systems around the globe. Daem was created to connect licensed volunteer doctors with patients at home to reduce the burden on hospitals and clinics. Daem application is an end user support and online consultation system. This application allows users to get instant guidance for their COVID inquireis. The application allows users to create a ticket containing their symptoms and issues.The moderators then tag the ticket based on its urgency and redire
The project is developed using **Reactjs**, **Nodejs**, **Express** framework and **MongoDB** for database.


## Deployment

---

http://frontend-lb-tf-1782918022.us-east-2.elb.amazonaws.com/home

## Table of Contents

---

<!-- TOC -->

- [Features](#features)
- [Getting Started](#getting-started)
  - [Setup Your Environment](#setup-your-environment)
  - [Using Docker](#using-docker)
- [Configurations](#configurations)
- [Dependencies](#dependencies)
- [Limitations](#limitations)
- [Possible Improvements](#possible-improvements)
- [About Us](#about-us)
  <!-- /TOC -->

## Features

---

### Patient
- Open tickets attaching any CT scans or blood tests
- Receive notification when doctor reply to their tickets
- Review tickets, edit and delete them in case they are not resolved yet
- Licensed volunteer doctors can apply to be one of daem's medical team

### Moderator
- Redirect tickets to doctors
- Tag tickets by their urgency
- Delete unappropriate tickets
- Review, approve and reject doctors' application
- Review all users in system

### Doctor
- Tickets can be filtered by their state, date or urgency 
- View patients' medical records (previous tickets)
- Close tickets once the inquiry is resolved
- Reply to tickets giving any advices or prescription

### Application
- English / Arabic languages support
- Provide medical news and articles to the application


## Getting Started

---

To use and run this project you need to:

Before executing the following commands, please install npm as stated in the following setup


#### Setup Your Environment

---

1. Install the latest version of NodeJS, npm and MongoDB You can download them at https://nodejs.org/en/download/ and https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

2. clone both fornt end repo from https://github.com/hossamkhalil01/daem-frontend.git and backend repo from https://github.com/hossamkhalil01/daem-backend.git and follow setup steps for each.

3. Navigate to the root folder of the application in the command line.

4. Create a file called ".env" in the root directory and add your API Key: REACT_APP_API_URL="Your API hostname"

5. Type npm install to install required npm packages.

```bash
npm install
```

6. Run server using
```bash
npm start
``` 

7. Go to the browser and go to the following url: **http://localhost:3000**


#### Using Docker

---

You can also use the docker image provided to setup a running environment
for the application to avoid any environment conflicts.

Change your working directory to the projects folder and execute the following commands (only one time)

```bash
docker-compose build
```

to build the image and then

```bash
docker-compose run app mongod
```

to setup the database


## Dependencies

---

- [Node] (https://nodejs.org/en/download/)
- [npm] (https://nodejs.org/en/download/)
- [MongoDB] (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu)


## Possible Improvements

---

- Live chat with between the patients and the doctors

---

## About Us

We are a team of software engineering students at ITI intake 41, Smart Village branch, Open-source application track.

### Development team
- Abdelrahman Montaser
- Ahmed Mamdouh
- Aya Hamed
- Hossam Khalil

### Depolyment team
- Abdelrahman Hassan
- Nagi Adel