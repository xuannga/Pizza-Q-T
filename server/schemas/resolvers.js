const { School, Class, Professor } = require('../models');

const resolvers = {
  Query: {
     
     order:  {},//single order - kitchen},

     getorders:  { },// get all active orders, by status - kitchen},

     getqueue: {},    // might be same as getorders

     getusers: {},//

     me: {},   //  getmy order, history - user
    // schools: async () => {
    //   return await School.find({}).populate('classes').populate({
    //     path: 'classes',
    //     populate: 'professor'
    //   });
    // },
  },
  // Define the functions that will fulfill the mutations
  Mutation: {
    createuser: {} ,// byuser
    addorder:  {},// by user
    updateorder: {}, // user can change the order,
    login: {},  // by user
    cancelorder: {}, // by user
    updatequeue: {},
    logout: {},// Do we need? How is accomplished
    //   addSchool: async (parent, { name, location, studentCount }) => {
  //     // Create and return the new School object
  //     return await School.create({ name, location, studentCount });
  //   }
  // }
  }
};

module.exports = resolvers;
