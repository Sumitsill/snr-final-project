# Database Setup Guide (MySQL Workbench)

This project uses MySQL for the database. Since you are not using XAMPP, you will need to install MySQL Server and MySQL Workbench separately.

## 1. Install MySQL

1.  **Download MySQL Installer**: Go to [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/) and download the installer for Windows.
2.  **Run Installer**:
    *   Choose "Custom" or "Developer Default".
    *   Make sure **MySQL Server** and **MySQL Workbench** are selected.
    *   During configuration, you will be asked to set a **Root Password**. **Remember this password!**

## 2. Configure the Project

1.  Open the file named `.env` in the project folder.
2.  Update the `DB_PASSWORD` with the password you set during installation.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_ACTUAL_PASSWORD  <-- Change this
DB_NAME=portfolio_db
PORT=3000
```

## 3. Import the Database

1.  Open **MySQL Workbench**.
2.  Connect to your local instance (click the box that says "Local instance MySQL80" or similar).
3.  In the top menu, go to **Server** -> **Data Import**.
4.  Select **Import from Self-Contained File**.
5.  Browse and select the `database.sql` file from this project folder.
6.  Click **Start Import**.

## 4. Run the Server

1.  Open a terminal in the project folder.
2.  Run `npm start`.
3.  You should see "Connected to MySQL database".
