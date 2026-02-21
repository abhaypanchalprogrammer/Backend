Cluster :-
A cluster is a combination of storage and processor.
We will use MongoDB Atlas Cloud.
You can add multiple databases in a single cluster.

Database Integration :-
To integrate MongoDB into your backend:

1. Create a Config Folder
   Make a folder called config.
   Inside it, create a file database.js.

```javascript
// config/database.js
const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

module.exports = connectToDb;
```

-- Call this `connectToDb()` in server.js

2. Create a Schema
   Make a folder called model.
   Inside it, create database.js.

```javascript
// model/database.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = noteSchema;
```

3. Create a Model
   Make another folder called models.
   Inside it, create model.js.

```javascript
// models/model.js
const mongoose = require("mongoose");
const noteSchema = require("../model/database");

const Note = mongoose.model("notes", noteSchema);

module.exports = Note;
```

✅ Summary

config/database.js → Connects to MongoDB.
model/database.js → Defines the schema.
models/model.js → Creates the model to interact with the database.

Starting Frontend on the Same Port as Backend :-
To start the frontend on the same port as the backend, run:
`npm run build`
This command will generate a folder called dist.

Inside the dist folder, you will find:
-- index.html file
-- assets folder
Inside assets, there are two folders:
-- css → contains styles
-- js → contains scripts

Copy both index.html and the assets folder and move them into your backend folder inside src folder.

Setup in Backend (app.js)
Require path:

```javascript
const path = require("path"); // requiring path
```

Make the folder static:

```javascript
app.use(express.static("./public")); // making folder static
```

Create a wildcard route to handle requests for undefined APIs:

```javascript
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});
```

Note:
The wildcard is used to take action when there is no API defined and a user hits a request directly.

4. _Authentication_

📌 Authentication, Authorization, Validation, Verification

✅ Authentication → Identify whether the request is coming from a valid user.
👉 `Example: Checking username/password, JWT token, or login session.`
✅ Authorization → Decide what a user is allowed to do.
👉 `Example: Checking whether the user can access admin routes or perform specific actions.`
✅ Validation → Check the format and structure of input data.
👉 `Example: Email format, password length, required fields.`
✅ Verification → Confirm or verify data correctness.
👉 `Example: OTP verification, email verification, or confirming user identity.`

📌Routes Folder in Backend (Professional Practice)
In professional backend development, we create a separate routes folder to keep route logic organized.

📌 Why create routes folder?
Improves project structure
Makes code clean and maintainable
Separates endpoint handling from server setup

📌 How routing works in separate files?
👉 Create router instance using:
`const authRoute = express.Router();`
express.Router() creates a mini router to group related routes.

📌 Folder Structure Example

```
backend/
├── routes/
│ └── authRoute.js
├── controllers/
├── models/
├── server.js
```

📌 Example Route File → routes/authRoute.js
const express = require("express");
const authRoute = express.Router();

```javascript
authRoute.get("/", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = authRoute;
```

📌 Import Route in Server File

```javascript
const authRoute = require("./routes/authRoute");

app.use("/auth", authRoute);
```

📌 Endpoint Access

If route path is /auth, then final URL becomes:
`/auth/`

5. User Registration Flow (Without Password Hashing)
   📌 Overview

In this registration process, a user sends name, email, and password to the server.
The backend checks whether a user with the same email already exists in the database.
If the user exists, registration is stopped; otherwise, a new user is saved in the database.

🔁 Step-by-Step Working
1️⃣ User sends data to the server

The client sends a POST request to the registration API.
POST /api/auth/register
Request Body:

```json
{
  "name": "Abhay",
  "email": "abhay@example.com",
  "password": "123456"
}
```

2️⃣ Server receives the request
The Express server:
Uses `express.json()` middleware
Reads user data from `req.body`

`const { name, email, password } = req.body;`
3️⃣ Database checks if user already exists
The backend checks the database using the email field.
`const isUserExist = await userModel.findOne({ email });`

Why email is used?
Email is unique for every user
Prevents duplicate accounts
Easy to identify users

4️⃣ If user already exists
If a user with the given email is found:

```javascript
if (isUserExist) {
  return res.status(400).json({
    message: "User already exists",
  });
}
```

📌 Registration is stopped.

5️⃣ If user does not exist
If no user is found with the given email:
A new user is created
Data is stored in the database

```javascript
const user = await userModel.create({
  name,
  email,
  password,
});
```

6️⃣ Server sends success response
After successful registration, the server sends:

```javascript
res.status(201).json({
  message: "User registered successfully",
  user,
});
```

📊 Flow Diagram (Easy)

```
User → Sends name, email, password
→ Server receives request
→ Database checks email
├─ Exists → Error response
└─ Not exists → Create new user
→ Success response
```

🧠 Important Points to Remember
Email is checked before user creation
Duplicate users are not allowed
Database stores user data
Password is stored as received (for now)
This is a basic registration flow

⚠️ Learning Note

At this stage:
Password hashing is skipped for simplicity
This approach is for learning purpose only
Security improvements can be added later

6. JWT & Token Creation

1️⃣ What is JWT?
JWT (JSON Web Token) is a compact string used to identify a user after authentication.
It is encoded, not encrypted
Anyone can decode it
Only the server can verify it using a secret key

2️⃣ Why Token is Created?
A token is created to:
Prove user identity
Avoid storing sessions on server
Allow stateless authentication
After registration or login, the server generates a token and sends it to the client.

3️⃣ Installing JWT
`npm install jsonwebtoken`
4️⃣ Importing JWT

```javascript
import jwt from "jsonwebtoken";
const { jsonwebtoken } = jwt;
```

JWT is a CommonJS package, so it is imported as default.

5️⃣ jwt.sign() – Token Creation

```javascript
const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
);
```

6️⃣ jwt.sign() Parameters Explained
🔹 1st Parameter → Payload

```javascript
{
  id: user._id,
  email: user.email
}
```

This data goes inside the token
It is Base64URL-encoded
Anyone can decode it
Do NOT store sensitive data here

🔹 2nd Parameter → Secret Key
`process.env.JWT_SECRET`
Used to sign the token
Prevents token tampering
Must be kept secret
Stored in `.env` file

Example:
`JWT_SECRET=mySecretKey`

7️⃣ What jwt.sign() Returns
`const token = jwt.sign(...)`
Returns a string

8️⃣ What is Inside the Token?

JWT has 3 parts:
HEADER.PAYLOAD.SIGNATURE
Header → algorithm & type
Payload → id, email, iat
Signature → verifies authenticity

9️⃣ iat (Issued At)

JWT automatically adds:
iat: <timestamp>
Means Issued At
Unix timestamp (seconds)
Represents token creation time

10️⃣ Sending Token to Client

```javascript
res.json({
  token,
});
```

Client stores the token and sends it with future requests.

⚠️ Important Rules
JWT does NOT encrypt data
Payload is readable after decoding
Secret key should never be exposed
Token proves identity, not permissions

🧠 One-Line Summary
JWT token is created using jwt.sign(payload, secret) and is used to identify users in a stateless way.
