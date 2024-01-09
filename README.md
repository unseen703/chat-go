<h1 align="center">
  <a href="https://astonishing-elf-ae6e2c.netlify.app/">
    Chat Go
  </a>
</h1>

<p align="center">
Real-Time Chat Website with MERN Stack, Socket.io, Redux Toolkit, and Tailwind CSS
  <br>
 This platform is a live chat website facilitating real-time connections between users. It was constructed using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Socket.io for real-time communication, Redux Toolkit for state management, and Tailwind CSS for styling.
</p>
<p align="center">
  <strong><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /></strong>
</p>

![individual chat](https://github.com/unseen703/chatgo/assets/103515582/701ce69d-5de8-4a8a-9e7d-c1e5f27f090b)

## 🗂 Project Breakdown
    
### 1. API Server (Backend)
    
Directory server
    
*Chat Go backend supports the following API endpoints:*

View the complete API documentation <a href="https://github.com/unseen703/chatgo_temp/edit/main/README.md">here</a>.

#### Chat Routes:

POST */chats* (Requires authentication)

GET */chats* (Requires authentication)

POST */chats/group* (Requires authentication)

PATCH */chats/group/rename* (Requires authentication)

PATCH */chats/groupAdd* (Requires authentication)

PATCH */chats/groupRemove* (Requires authentication)

DELETE */chats/removeuser* (Requires authentication)

#### Message Routes:

POST */messages* (Requires authentication)

GET */messages/:chatId* (Requires authentication)

#### Authentication Endpoints:

POST */auth/register*

POST */auth/login*

GET */auth/valid* (Requires authentication)

GET */auth/logout* (Requires authentication)

POST */api/google* (Requires authentication)

GET */api/user?* (Requires authentication)

GET */api/users/:id* (Requires authentication)

PATCH */api/users/update/:id* (Requires authentication)

### 2. React Client (Frontend)

Directory clients

#### Features:

- Real-time chat: users can send and receive messages in real-time
- User authentication: users can sign up, log in, and log out using JWT and Google Auth
- Group creation: users can create chat rooms and invite others to join
- Notifications: users can receive notifications on new messages
- Emojis: users can send and receive emojis in messages
- Profile page where users can update their avatar and display name.
- Users can create a room to chat with others.
- Search functionality.
- Responsive design: the website is optimized for different screen sizes and devices
- Bifurcation of Group(one-to-one) and Individual chat(one-to-many).

## ⚒ Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory.
- Supply the following credentials


REACT_APP_CLIENT_ID = ""
REACT_APP_SERVER_URL=


To obtain your Google ClientID for authentication, follow these steps:

1. Navigate to the [credential Page](https://console.cloud.google.com/apis/credentials). If you're new, [create a new project first](https://console.cloud.google.com/projectcreate).

2. Click on "Create credentials" and choose "OAuth client ID".

3. Select the Web application type.

4. Provide a name for your OAuth client and click "Create".

5. Ensure you specify your domain and redirect URL for Google to recognize the origin domain where it will display the consent screen. During development, this will typically be http://localhost:3000 and http://localhost:3000/login.

6. Copy the Client ID and assign it to the variable REACT_APP_GOOGLE_CLIENT_ID in your .env file.


$ cd clients
$ npm install (to install client-side dependencies)
$ npm start (to start the client)

In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials


MONGO_URL = 
PORT = 5000 
JWT_SECRET = 
GOOGLE_CLIENT_ID = 




$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)

(If running "npm i" fails, after deleting the package.json file, you can use "npm init" to initialize a new npm project and then manually install all dependencies.)
