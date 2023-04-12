# CRUD Blog App

This is a CRUD (Create, Read, Update, Delete) blog application that allows three different types of users: Owner, Admin, and Guest. The guest can only see their own personal information and blogs, while the admin can create and edit blogs, and view other users' information but cannot edit it. The owner has all the privileges of an admin plus the ability to edit user information, assign permissions, and delete users.

## Technologies Used

This project was built using:

- React (frontend)
- Scss (style)
- Nodejs (backend)
- Database (mysql)
- FrontEnd code available at [githublink](https://github.com/Erodot0/Crud-client)

## Features

- Three different types of users
- CRUD functionalities for blogs and user information
- Personalized view for the guest user
- Authorization and permission system

## Installation and Usage

To run the project locally:

1. Clone the repository
2. Install dependencies using `npm install`
3. Set up your MySQL database and configure the database config file inside `server/dbconfig/db.js`.
4. Run the development server using `nodemon index.js`

### Setting up the MySQL database

To set up your MySQL database:

1. Install MySQL if you haven't already.
2. Create a new database on mysql.
3. Inside the database, you must create two tables one for the users, called user_db and the other one for the blogs called blog_db

#### Setting up MySQL tables

```bash
CREATE TABLE user_db (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Owner', 'Admin', 'Guest') DEFAULT 'guest'
);
```

```bash
CREATE TABLE blog_db (
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    blog_title VARCHAR(255) NOT NULL,
    blog_desc TEXT NOT NULL,
);
```

## Contact Information

If you have any suggestions or feedback, please feel free to contact me on my website at [www.janmanpreet.com](www.janmanpreet.com) or via email at janmanpreet.singh@gmail.com.
