Activity 4: Weather Proxy API

This application allows users to view the current temperature and weather condition of any city they enter.

It uses the OpenWeatherMap API to retrieve real-time weather data, which the backend filters and returns in a simplified format.

The system consists of a NestJS backend that serves as a proxy to fetch and process weather information, and a React frontend that provides an easy-to-use interface for users to search and view the results.

🧩 System Overview
Component	Technology	Description
Backend	NestJS	Acts as a proxy to OpenWeatherMap and exposes Swagger API documentation
Frontend	React (Vite)	Displays weather information based on backend responses
📂 Repositories

Backend (weather-proxy): https://github.com/DavenWaay/weather-proxy

Frontend (weather-frontend): https://github.com/DavenWaay/weather-frontend.git

⚙️ Prerequisites

Before running the project, make sure you have:

Node.js

npm (comes with Node.js) or yarn

A code editor (e.g., VS Code)

An OpenWeatherMap API key (set as environment variable OWM_KEY)

🚀 How to Run the Project

Clone both repositories

git clone https://github.com/DavenWaay/weather-proxy
git clone https://github.com/DavenWaay/weather-frontend.git


Install dependencies in both folders:

npm install
# or
yarn install


Set up environment variable in the backend (.env file):

OWM_KEY=your_api_key_here


Run the backend:

npm run start:dev


Access API Docs: http://localhost:3000/api

Run the frontend:

npm run dev


Open the app at http://localhost:5173

📦 Dependencies Used
Backend (weather-proxy)

@nestjs/common, @nestjs/core, @nestjs/platform-express, @nestjs/config – NestJS framework

axios – HTTP client for external API calls

@nestjs/swagger, swagger-ui-express – OpenAPI/Swagger integration and UI

reflect-metadata, rxjs

Dev Dependencies:

ts-node, typescript, tsconfig-paths, @types/*, jest, eslint, etc.

Frontend (weather-frontend)

react, react-dom

vite, @vitejs/plugin-react

typescript, eslint, and other type/dev dependencies

Exact versions are listed in each project's package.json.
