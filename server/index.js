const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors'); 
const db = require('./config/db') ; 

const PORT = process.env.PORT || 4000;

// ROUTES : 
const projectRoute = require('./routes/projectRoute')  ; 
const taskRoute = require('./routes/taskRoute')   ; 

db.connect() ; 
app.use(express.json());
app.use(cors());

app.use('/api/projects' ,  projectRoute)  ; 
app.use('/api/tasks' , taskRoute) ; 


app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    })
})




//server listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


