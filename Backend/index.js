const express = require("express");
const cors = require("cors");
const route = require("./App/route");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins (or specify your frontend URL)
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));
app.use(route);

app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`));