# IS24 ecc-dssb-code-challenge

Applicant name: Han Xiang (Harry) Wu

# Prerequisites
To run this application, you need to have Docker and Docker Compose installed on your system.

Alternatively, you could install the necessary modules based on the packages.json file

# Frameworks
Backend: Express version: 4.17.1
Frontend: React version: 16.11.0

# Instructions

1. Running the App

In the root folder, run the command "docker-compose up --build". Afterwards, you should be able to access the application servers at the following URLs:

Frontend (React): http://localhost:3333
Backend (Express): http://localhost:3000
Please note that the frontend is the main website, while the backend server only for API calls.

or run "npm run build" from the frontend directory after you clone the project locally and then visit http://localhost:3000

2. Shutting down the App

When you are done using the application, you can shut it down by running the command "docker-compose down" from the root folder.

If you want to completely shut down the application and remove all volumes and image data, 
run the command "docker-compose down --volumes --rmi all".

This command removes all volumes, networks, and images defined in the docker compose file, effectively cleaning up all resources used by the application.

# Swagger Documentation   
please visit http://localhost:3000/api/api-docs

# Release version 0.0.1
1. Basic Products CRUD app