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
