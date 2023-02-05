
//index.js

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const middleware = require('./middleware');
const crud = require('./crud');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');



const dotenv = require('dotenv');
dotenv.config();

// Initial Config
const app = express();
const port = process.env.PORT || 1337;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Config cors
app.use(cors());
//routes

function logLoggingAttempt(target) {
    models.Logs.create({
        action: 'Attempted login',
        target: target,
    }).then(() => {}).catch((e) => {console.log(e)});
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await models.Users.findOne({ email: email });
        if(!user) {
            res.status(401).send('Invalid email');
        } else {
            const match = await bcrypt.compareSync(password, user.password);
            if(match) {
                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
                res.send({
                    token: token,
                    userid: user._id,
                });
            } else {
                res.status(401).send('Invalid password');
                logLoggingAttempt(user._id);
            }
        }

    } catch(e) {
        res.status(500).send(e.message);
    }

});

const userCrud = crud(models.Users);
const logCrud = crud(models.Logs);

app.get('/api/users', [middleware.isAuthenticated, userCrud.readMany, middleware.hidePass]);

app.get('/api/users/:_id', [middleware.isAuthenticated, userCrud.readOne, middleware.hidePass]);
app.post('/api/users', [middleware.hashPass, userCrud.create, (req, res, next) => {req.action = "create"; next();}, middleware.log]);
app.put('/api/users/:_id', [middleware.isAuthenticated, middleware.isAdminOrThemselves, middleware.removeAndReplacePass, userCrud.update, (req, res, next) => {req.action = "modify"; next();}], middleware.log); 
app.put('/api/users/changePassword/:_id', [middleware.isAuthenticated, middleware.isAdminOrThemselves, middleware.hashPass, userCrud.update, (req, res, next) => {req.action = "modifyPassword"; next();}], middleware.log); 
app.delete('/api/users/:_id', [middleware.isAuthenticated, middleware.isAdminOrThemselves, userCrud.remove, (req, res, next) => {req.action = "delete"; next();}], middleware.log);

app.get('/api/logs', [middleware.isAuthenticated, middleware.isAdmin], logCrud.readMany);
app.get('/api/logs/:_id', [middleware.isAuthenticated, middleware.isAdmin], logCrud.readOne);

// 
// Server
app.listen(port, () => console.log(`Listening on port ${port}`));