 
const db = require('../config/connection');
const { PizzaOrder, Kitchen , Order, History, Profile , Jobs} = require('../models');

const orderData = require('./orderData.json');
const kitchenData = require('./kitchenData.json');
const historyData = require('./historyData.json');
 const profileData = require('./profileData.json');
 
db.once('open', async () => {
  // clean database
  await Kitchen.deleteMany({});
  await Order.deleteMany({});
  // await History.deleteMany({});
  await Profile.deleteMany({});

  // bulk create each model
  // const kitchen = await Kitchen.insertMany(kitchenData);
  const orders = await Order.insertMany(orderData);
  const users = await Profile.insertMany(profileData);
  const kitchen = await Kitchen.insertMany(kitchenData);
  // const history = await History.insertMany(historyData);

  // for (newClass of classes) {
  //   // randomly add each class to a school
  //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
  //   tempSchool.classes.push(newClass._id);
  //   await tempSchool.save();

  //   // randomly add a professor to each class
  //   const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
  //   newClass.professor = tempProfessor._id;
  //   await newClass.save();

  //   // reference class on professor model, too
  //   tempProfessor.classes.push(newClass._id);
  //   await tempProfessor.save();
  // }

  console.log('all done!');
  process.exit(0);
});
