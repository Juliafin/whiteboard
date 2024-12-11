// function fake

const mongoose = require('mongoose');
const {
  Curriculum
} = require('./../student_models/models');
const faker = require('faker');
const {generateUser} = require('./../user_models/seedUsers');
const student = generateUser('student');

mongoose.Promise = global.Promise;

function generateFakeCurriculumData(numberOfStudentRecords,condition, res) {
  console.log(`Generating ${numberOfStudentRecords} fake student record(s)`);
  // console.log(numberOfStudentRecords);
  // console.log ('RES IN SEEDUSER', res);
  if (condition) {
    return {
      first_name: student.first_name,
      last_name: student.last_name,
      email: faker.internet.email(),
      parent_first_name: faker.name.firstName(),
      parent_last_name: faker.name.lastName(),
      address: {
        street_address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zipcode: faker.address.zipCode()
      },
      student_curriculum: [{
        project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
        project_description: faker.lorem.paragraph(),
        teacher_project_comments: faker.lorem.paragraph()
      },
      {
        project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
        project_description: faker.lorem.paragraph(),
        teacher_project_comments: faker.lorem.paragraph()
      }],
      student_lesson_time: {
        weekday: faker.date.weekday(),
        startTime: faker.date.recent().toISOString(),
        endTime: faker.date.recent().toISOString(),
        startDate: faker.date.recent().toISOString()
      },
      teacher_comments: faker.lorem.paragraphs()
    };

  } else {

    for (let i = 1; i < numberOfStudentRecords; i++) {
      // console.log('creating curriculum object');
      Curriculum
        .create({
          first_name: student.first_name,
          last_name: student.last_name,
          email: faker.internet.email(),
          parent_first_name: faker.name.firstName(),
          parent_last_name: faker.name.lastName(),
          address: {
            street_address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipcode: faker.address.zipCode()
          },
          student_curriculum: [{
            project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
            project_description: faker.lorem.paragraph(),
            teacher_project_comments: faker.lorem.paragraph()
          },
          {
            project_name: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
            project_description: faker.lorem.paragraph(),
            teacher_project_comments: faker.lorem.paragraph()
          }
          ],
          student_lesson_time: {
            weekday: faker.date.weekday(),
            startTime: faker.date.recent().toISOString(),
            endTime: faker.date.recent().toISOString()
          },
          teacher_comments: faker.lorem.paragraphs(),
          author: {
            id: res.id,
            first_name: res.first_name,
            last_name: res.last_name            
          }
        })
        .then((student) => {
          if (i === 10) {
            //test to return a random record
            // console.log(student);

          }
        });
      // console.log(i);
      // console.log(numberOfStudentRecords);    
    } // ends for loop

  }

  console.log('Student records generated.');
} // ends function




function seedCurriculumDb(curricArr) {
  // returns a promise
  return Curriculum.insertMany(curricArr);
}

function dismantleDB() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}


module.exports = {
  generateFakeCurriculumData,
  dismantleDB, student
};