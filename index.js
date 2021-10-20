//Dependencies
const express = require('express');
const morgan = require('morgan');
const app = express();
//Routers
const empleado = require('./routes/empleado');
const users = require('./routes/users');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", index);

app.use("/users", users);
app.use(auth);
app.use("/empleado", empleado);
app.use(notFound);

app.listen(3000, () => {
    console.log("Server is running...");
});
