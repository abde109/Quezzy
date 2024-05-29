# QuizMaster App

QuizMaster is a platform where users can take quizzes to test their knowledge and track their progress. Administrators can manage quizzes and users.

## Getting Started

### Prerequisites

- **Node.js and npm**: You can download and install Node.js (which includes npm) from [nodejs.org](https://nodejs.org/). Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, and npm is the package manager for Node.js.

- **MongoDB Atlas account**: MongoDB Atlas is a cloud-hosted MongoDB service. You can sign up for a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a cluster to store your application's data.

- **React and TypeScript**: The frontend of this project is built using React, a JavaScript library for building user interfaces, and TypeScript, a typed superset of JavaScript. You can learn more about React at [reactjs.org](https://reactjs.org/) and TypeScript at [typescriptlang.org](https://www.typescriptlang.org/).

- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. You can learn more and find the documentation at [tailwindcss.com](https://tailwindcss.com/).

- **Express**: Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. You can learn more about Express at [expressjs.com](https://expressjs.com/).

### Setting Up the Backend

1. Navigate to the `backend` directory:

    ```sh
    cd quizmaster-app/backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables. Replace `<your-mongodb-uri>` with your actual MongoDB Atlas connection string:

    ```env
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    ```

4. Start the backend server:

    ```sh
    npm run serve
    ```

### Setting Up the Frontend

1. Navigate to the `frontend` directory:

    ```sh
    cd quizmaster-app/frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run front
    ```

### Running Both Servers Simultaneously

In the root directory of the project, you can run both the backend and frontend servers simultaneously using `concurrently`:

1. Install `concurrently` in the root directory if not already installed:

    ```sh
    cd quizmaster-app
    npm install concurrently --save-dev
    ```

2. Add the following script to the `package.json` in the root directory:

    ```json
    "scripts": {
      "start": "concurrently \"npm run serve --prefix backend\" \"npm run front --prefix frontend\""
    }
    ```

3. Run the servers:

    ```sh
    npm start
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
