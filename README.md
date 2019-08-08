# warwick-organic

MERN stack Retail store for selling Organic products from farmers

# Technologies:

React 16.8 MongoDB, Express (MERN stack)

# Step:1 How to setup a basic Express server:

Here I created a GIT project first and created a local folder(organic-store) in the computer then cd to that folder then run the command: git clone https://github.com/arunharshan/orgainc-store.git

1. Create a folder
   If you want to connect you project in the future with Git, better create a project in the GIT repository and checkout the folder. (Just a project name/folder is enough)

Following steps are for non git users

2. run the followig command from the created folder: npm init -y

2a. You would see a package.json file after the above cmd.

2b. Goto the package.json file and modify:

"description": "Your App name", "main": "server.js", "scripts": { "start": "node server.js", "server": "nodemon server.js" },....

3. Now its time to install the dependency:

3a. npm i bcryptjs config express express-validator jsonwebtoken mongoose

3b. npm i -D concurrently nodemon

4. In the root folder create server.js

5. Create a .gitignore file and add the plain text, node_modules/

6. To <b>run the server: npm run server</b>, which will run the page in localhost://5000 if the dev/prod in server.js is not configured.

Go throught the simple step by step setup process below:(ignore package.json and other common bundle files)

# Initial setup of Express server:

https://github.com/arunharshan/warwick-organic/commit/b9326ace5d7a37d58c048773b9983ce187ed83d9

# Initial setup of MongoDB connection with express

https://github.com/arunharshan/warwick-organic/commit/05ff2978876865823fa21d1c7def4ef40b81e4a2

# Setting Up Modals, Schema, Validation, Password encryption, JWT token on Save new user

https://github.com/arunharshan/warwick-organic/commit/a45049ecd98b619ec37ba10f1aee1a15546618cd

# 1. Login and token setting. 2. Check the user status by sending token to header

how to login and return a token on success;
Check the user status by sending header token and get the user details based on token payload (db user ID is used as a key to compare and retrive user info from JWT token payload)

https://github.com/arunharshan/warwick-organic/commit/a65acb991615e4f9689b5b2b8cadbbf83338b085

# Logout( need to work on it) + code clean up change the Modal name to upper case eg: user to User
