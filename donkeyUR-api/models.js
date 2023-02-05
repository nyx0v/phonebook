//models.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/donkeyUR', {useNewUrlParser: true});

// =======
// Schemas
// =======

const userSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateDeNaissance: {
        type: Date,
        required: true
    },
    tel: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    adresse: String,
    created: { type: Date, default: Date.now }
  },
  { strict: false }
);

const logSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
        required: true
    },
    action: {
        type: String,
        enum: ['create', 'modify', 'delete', 'modifyPassword', 'Attempted login'],
        required: true,
        
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const models = {};
models.Users = mongoose.model('users', userSchema);
models.Logs = mongoose.model('logs', logSchema);

module.exports = models;