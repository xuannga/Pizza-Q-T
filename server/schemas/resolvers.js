const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Kitchen } = require('../models');
const { signToken } = require('../utils/auth');
const { calculatequeuetime } = require('../utils/helpers');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    kitchentoday: async (parent, {_id}) =>{
      const kitch = await Kitchen.findById(_id);
      return kitch 
    },

    kitchens: async (parent, {_id}) =>{
      const kitch = await Kitchen.findById(_id);
      return kitch 
    },

    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];
      
      const { products } = await order.populate('products').execPopulate();
      
      // console.log("order", order)
      // console.log("products", products)

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addKitchen: async (parent,args) =>{
      const newkitchendata = {
        date: new Date().toLocaleDateString(),
        queue: []
      }
      const newKitchen = await Kitchen.create(newkitchendata);
       return newKitchen
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateKitchen: async (parent, {orderid }, context) =>{
      const nowkitchen = await Kitchen.find({
        _id:"617053975ef3373254013c90"});
      const productid = await Product.find({});
      
      qtime=15;
      // let qtime=calculatequeuetime(nowkitchen.queue, ) ;
      // pizzas from products
      console.log('beforekitchen', nowkitchen)
      console.log('productid',productid);
      let newtime = Date.now() + qtime*60000;
      let commtime = newtime.toString()
      const newjob = {
        orderId: orderid,
        priority: Date.now().toString(),  // convert to string 
        status: "active",
        pizzas:["Combo","Vegetarian","MeatLovers"],
        commitTime: commtime
      };

      console.log('newjob',newjob)
      const kitch = await Kitchen.findByIdAndUpdate(nowkitchen[0]._id,
        { $push: { queue: newjob }  });

      console.log('newkitch',kitch)
      // Examine/update queue, create qtime, update order
     
      return kitch
   
  },

    addOrder: async (parent, { products }, context) => {
      console.log(context);
      console.log('order has been added')
      if (context.user) {
        const order = new Order({ products });
        console.log("add order",order)
        const upUser = await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
       
        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
