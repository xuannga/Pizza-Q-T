const { Order, Profile,PizzaOrder, Kitchen } = require('../models');

const resolvers = {
  Query: {
     
     order: async (parent, { _id }) => {
      return await Order.findById(_id);
      }, //single order - kitchen

     orders:  async (parent, { order, name, date, phone, price }) => {
      const params = {};

      if (order) {
        params.order = order;
      }

      if (date) {
        params.date = {
          $regex: date
        };
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      if (phone) {
        params.phone = {
          $regex: phone
        };
      }

      if (price) {
        params.price = {
          $regex: price
        };
      }
      
     
      return await Order.find(params);
    }, // get all active orders, by status - kitchen

     queue: async(parent,{ lastupdated, orderId, priority, status}) =>{
       const params = {};
       

       if(status) {
         params.status = {
           $regex: status
         };
       }

       if(priority) {
         params.priority = {
           $regex: priority
         };
       }

       if(orderId) {
         params.orderId = {
             orderId
         };
       }

       if(lastupdated) {
         params.lastupdated = {
           $regex: lastupdated
         };
       }


       return await Kitchen.find(params);
     }     // might be same as getorders

     user: async (parent, { name }) => {
      return Profile.findOne({ name });
     }

     me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.pizzaOrder',
          populate: 'pizzaOrder'
        });

        user.orders.sort((a, b) => b.date - a.date);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    }   //  getmy order, history - user
    // schools: async () => {
    //   return await School.find({}).populate('classes').populate({
    //     path: 'classes',
    //     populate: 'professor'
    //   });
    // },
    // classes: async () => {
    //   return await Class.find({}).populate('professor');
    // },
    // class: async (parent, args) => {
    //   return await Class.findById(args.id);
    // },
    // professors: async () => {
    //   return await Professor.find({}).populate('classes');
    // }
  },
  // Define the functions that will fulfill the mutations
  Mutation: {
    createuser:  // byuser
    addorder:  // by user
    updateorder:  // user can change the order,
    login:   // by user
    cancelorder:  // by user
    updatequeue: 
    logout: // Do we need? How is accomplished
    //   addSchool: async (parent, { name, location, studentCount }) => {
  //     // Create and return the new School object
  //     return await School.create({ name, location, studentCount });
  //   }
  // }
  }
};

module.exports = resolvers;
