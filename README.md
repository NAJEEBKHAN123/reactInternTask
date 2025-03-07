# reactInternTask

## Task Management System (Backend)

### Description
This is the backend API for the **Task Management System**, built using **Node.js**, **Express.js**, and **MongoDB**. It provides **CRUD operations** along with **filtering**, **searching**, and **pagination** features.

---

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

---

## Project Structure
The project is mainly divided into three main parts:

1. **Model**: 
   - Defines the **Schema** of the project using Mongoose.
   - Schema means the **type of data** that will be stored in the project (e.g., Products, Employees, Tasks).
   
2. **Controller**: 
   - Contains all **CRUD operations** (Create, Read, Update, Delete) logic.

3. **Routes**: 
   - Defines all **API endpoints** to perform CRUD operations.

---

## DB Connection
- Create a `.env` file inside the **root folder**.
- Add your **MongoDB URL** inside the `.env` file like this:
```env
MONGO_URL= with the name of Task 


## create frontend folder.

after create folder npm create vite@latest and install npm package for frontend
after that implement setup for frontend and Fetch data from backend through 
http://localhost:3000/api/items after that create itemFrom and implement functionlity for create items delete 
items .

## **Technologies Used**

React.js
Vite
Tailwind CSS
React Paginat
Axios

## ***Features***

Task Creation
Task Listing
Task Update
Task Deletion
Search and Filter Tasks
Pagination
Loading Spinners
Error Handling

### How to Use

Go to the Create Task form to add a new task.
View tasks in the Task List section.
Use the Search field to filter tasks by name.
Update or delete tasks using the action buttons.