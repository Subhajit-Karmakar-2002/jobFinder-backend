const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const jobRoute = require('./routes/job')



dotenv.config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGOURL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));


app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/users", userRoute);


app.listen(port || 5001, () => console.log(`Listening on port ${port}!`))