const { History, Kitchen, Profile, Order, PizzaOrder } = require('../models');

const resolvers = {
    Mutation: {
        createUser: async(parent, args) => {
            const user = await Profile.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await Profile.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        updateorder: async(parent, { _id, order }) => {
            const decrement = Math.abs(order) * -1;

            return await Order.findByIdAndUpdate(_id, { $inc: { order: decrement } }, { new: true });

        },
        addorder: async(parent, { order }, context) => {
            if (context.user) {
                const newOrder = new Order({ order });

                const neworder = await Order.create(newOrder);

                return neworder;
            }

            throw new AuthenticationError('Not logged in');
        },
        //         cancelorder: async(parent, {}, context) => {
        //             if (context.user) {
        //                 const updatedUser = await Order.findOneAndUpdate({ _id: context.user._id }, { new: tue });
        //             }

        //             return updatedUser;
        //         }


    }

};

module.exports = resolvers;