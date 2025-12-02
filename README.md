# Jeet Biswas Portfolio - Contributor Platform

This project is a dynamic portfolio website that allows contributors to sign up, login, and upload their photography, videography, and web designs. It uses a **Node.js/Express** backend and a **MySQL** database.

## Prerequisites

Before running this project, ensure you have the following installed:

1.  **Node.js**: [Download and Install Node.js](https://nodejs.org/)
2.  **XAMPP** (or any MySQL Server): [Download XAMPP](https://www.apachefriends.org/index.html)

## Installation

1.  **Clone or Download** this repository to your local machine.
2.  Open a terminal (Command Prompt or PowerShell) in the project folder.
3.  Install the required dependencies by running:

    ```bash
    npm install
    ```

## Database Setup

1.  Start **XAMPP Control Panel** and start the **Apache** and **MySQL** modules.
2.  Open your browser and go to `http://localhost/phpmyadmin`.
3.  Click **New** to create a new database.
4.  Name the database `portfolio_db` and click **Create**.
5.  Select the `portfolio_db` database on the left sidebar.
6.  Go to the **Import** tab.
7.  Click **Choose File** and select the `database.sql` file located in this project folder.
8.  Click **Import** at the bottom to create the necessary tables (`users` and `media`).

## Configuration

The database connection is configured in `server.js`. The default settings assume a standard XAMPP setup:

*   **Host**: `localhost`
*   **User**: `root`
*   **Password**: (empty)
*   **Database**: `portfolio_db`

If your MySQL setup has a password, open `server.js` and update the `password` field in the `db` connection setup.

## Running the Application

1.  In your terminal (inside the project folder), run:

    ```bash
    npm start
    ```

    You should see the message: `Server running on http://localhost:3000` and `Connected to MySQL database`.

2.  Open your web browser and navigate to the project files. You can open `index.html` directly or use a local server (e.g., Live Server extension in VS Code).

## How to Use

1.  **Sign Up**: Go to `signup.html` to create a contributor account. You will receive a generated User ID and Password.
2.  **Login**: Use the credentials to log in at `login.html`.
3.  **Dashboard**: After logging in, you will be taken to `dashboard.html`.
    *   **Update Profile**: Add your bio, contact info, and social links.
    *   **Upload Media**: Upload photos, videos, or web designs.
4.  **View Gallery**: Go to `photography.html`, `videography.html`, or `web-design.html` to see uploaded content.
5.  **Public Profile**: Click "View Public Profile" on the dashboard to see your personal portfolio page.

## Troubleshooting

*   **Database Connection Failed**: Ensure XAMPP MySQL is running and credentials in `server.js` are correct.
*   **Upload Errors**: Ensure the file size is within limits (default is 50MB).
*   **CORS Issues**: The server is configured to allow CORS, so you should be able to fetch data from local HTML files.
