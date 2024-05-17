# QuizMaster App

QuizMaster is a platform where users can take quizzes to test their knowledge and track their progress. Administrators can manage quizzes and users.

## Project Structure

quizmaster-app/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ ├── quizController.ts
│ │ │ ├── userController.ts
│ │ │ └── authController.ts
│ │ ├── models/
│ │ │ ├── quizModel.ts
│ │ │ ├── userModel.ts
│ │ │ └── index.ts
│ │ ├── routes/
│ │ │ ├── quizRoutes.ts
│ │ │ ├── userRoutes.ts
│ │ │ └── authRoutes.ts
│ │ ├── middlewares/
│ │ │ ├── authMiddleware.ts
│ │ │ └── errorMiddleware.ts
│ │ ├── utils/
│ │ │ ├── database.ts
│ │ │ ├── logger.ts
│ │ │ └── constants.ts
│ │ ├── app.ts
│ │ └── server.ts
│ ├── package.json
│ ├── tsconfig.json
│ ├── .env
│ └── .gitignore
│
└── frontend/
├── public/
│ ├── index.html
│ └── favicon.ico
│
├── src/
│ ├── assets/
│ │ └── images/
│ │
│ ├── components/
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ ├── Layout.tsx
│ │ └── (Other reusable components)
│ │
│ ├── pages/
│ │ ├── AdminDashboard.tsx
│ │ ├── LandingPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── QuizPage.tsx
│ │ └── UserDashboard.tsx
│ │
│ ├── routes/
│ │ └── AppRoutes.tsx
│ │
│ ├── styles/
│ │ ├── variables.css
│ │ └── global.css
│ │
│ ├── utils/
│ │ ├── api.ts
│ │ ├── constants.ts
│ │ └── helpers.ts
│ │
│ ├── App.tsx
│ ├── index.tsx
│ ├── react-app-env.d.ts
│ ├── serviceWorker.ts
│ └── setupTests.ts
│
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json


## Getting Started

### Prerequisites

- Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
- MongoDB Atlas account. You can sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

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
    npm start
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
    npm start
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
      "start": "concurrently \"npm run start --prefix backend\" \"npm run start --prefix frontend\""
    }
    ```

3. Run the servers:

    ```sh
    npm start
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
