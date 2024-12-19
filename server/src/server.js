`use strict`;
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const {
  PORT,
  DATABASE_URL
} = process.env;

const app = express();
const {
  Curriculum
} = require('./models/student/student');
const {
  User
} = require('./models/user/user');
const curriculum_router = require('./routers/curriculum_router/curriculum_router');
const auth_router = require('./routers/auth_router/auth');
const welcome_router = require('./routers/welcome_router/welcome');
const {
  generateFakeCurriculumData
} = require('./models/student/seedStudents');
const {
  generateUser,
  saveUser
} = require('./models/user/seedUsers');

app.use(morgan('combined'));
app.use('/welcome', welcome_router);
app.use('/cu-manager', curriculum_router);
app.use('/auth', auth_router);
app.use(express.static('./public/login_registration/assets'));


app.use('*', (req, res) => {
  res.redirect('/welcome');
});


// add server functions to export for tests
let server;

async function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  // return new Promise((resolve, reject) => {
  //   mongoose.connect(databaseUrl, (err) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     server = app.listen(port, () => {
  //         console.log(`Your app is listening on port ${port}`);

  //         resolve(server);
  //       })
  //       .on('error', err => {
  //         mongoose.disconnect();
  //         reject(err);
  //       });
  //   });
  //   mongoose.connection.once('open', () => {


  //     console.log('mongoose connected');
  //   });
  // });

  try {
    await mongoose.connect(databaseUrl)
  } catch (error) {
    console.log('could not connect to mongo db', error);
  }

  try {
    server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)) 
  } catch (error) {
    console.log('could not start server', error);
  }

}

function closeServer() {

  return mongoose.disconnect().then(() => {
    console.log('mongoose disconnecting');
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer()
    .then(function () {
      User.countDocuments()
        .then(function (count) {
          if (count === 0) {
            saveUser(generateUser());
          }
        });
      Curriculum.countDocuments()
        .then(function (count) {
          if (count === 0) {
            generateFakeCurriculumData(19);
          }
        });

    })
    .catch(err => {
      console.error(`There was an error: ${err}`);
    });
}

console.log('hi');

module.exports = {
  app,
  runServer,
  closeServer
};