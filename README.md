# CRUD Web Application with Spring Boot, React, and Docker Deployment on AWS EBS



## Overview
This project is a CRUD (Create, Read, Update, Delete) web application developed using Spring Boot, React, and PostgreSQL. It allows users to perform basic CRUD operations on a specific data entity. The application is containerized using Docker and deployed on AWS Elastic Beanstalk. 

## Features
- Create, Read, Update, and Delete data entities through an intuitive web interface.
- Integration with PostgreSQL database for data persistence.
- Containerization of the application using Docker, ensuring consistent deployment across different environments.
- Deployment of the containerized application on AWS Elastic Beanstalk, providing scalability and high availability.
- Implementation of GitHub Actions workflows for automated testing and deployment, ensuring code quality and continuous delivery.
- Integration of Slack notifications for real-time updates and collaboration among the development team.

## Technologies Used
- Java
- Spring Boot
- React
- Docker
- AWS Elastic Beanstalk
- GitHub Actions
- PostgreSQL

## Automated Testing and Deployment
This project incorporates GitHub Actions workflows to automate testing and deployment processes. The workflows are triggered on specific events such as pushes to the repository or pull requests. They perform the following actions:
- Build the project and execute unit tests.
- Containerize the application using Docker.
- Deploy the Docker image to AWS Elastic Beanstalk.

## Collaboration and Communication
To enhance collaboration and real-time updates, this project integrates Slack notifications. Slack notifications provide instant notifications about key events, such as successful deployments, test results, and pull request activity. This integration allows team members to stay informed and collaborate effectively.

------------------

Feel free to explore the project, provide feedback, and contribute! Thank you for your interest and support.
