const db = require('../config/connection');
const { PizzaOrder, Kitchen, Order, History, Profile, Jobs } = require('../models');
const capacity = 20;
const avgcooktime = 15;
const names = ["John Smith", "Eleanor Rigsby", "Slyvia Hampton", "Mickey Mango"]
const ids = ["616907aae00c978118f0ca75", "616907aae00c978118f0ca79", "616907aae00c978118f0ca77", "616907aae00c978118f0ca7b"]
const phn = [3605551430, 3607708934, 3606509494, 3601234567]
function createnewOrder() {
    let qty = Math.ceil(2 * Math.random())
    let indx = Math.floor(4 * Math.random())
    let neworder = {
        "name": names[indx],
        "price": 21 * qty,
        "phone": phn[indx],
        "status": 'prelim',
        "commitTime": "2021-09-29 04:46:21.328Z",
        "pizzaorder": {
            "quantity": qty,
            "size": "large",
            "toppings": "Cheese, Pepperoni",
            "crust": "thick"
        }

    }
    return neworder
}


function calculatequeuetime(neworder, newqueue) {
    let qtime;
    let inprog = newqueue.filter(({ status }) => status !== 'complete').reduce((total, obj) => obj.quantity + total, 0)
    if (inprog < capacity) {
        qtime = avgcooktime;
    }
    else {
        qtime = Math.ceil(avgcooktime * (inprog - capacity) / capacity) + 15;
    }
    console.log(`your pizza will ready in ${qtime} minutes`)
    return qtime
}


db.once('open', async () => {
    let inputneworder = createnewOrder();
    // Load order into Order db 
    console.log('inputneworder', inputneworder)
    const newOrder = await Order.create(inputneworder);
    console.log('new order1', newOrder);
    const nowkitchen = await Kitchen.find({});
    console.log('nowkitchen',nowkitchen)
    const newqueue =nowkitchen[0].queue;
    let qtime = calculatequeuetime(inputneworder,newqueue);
    // Add order to kitchen queue
    let newjob = {
        "lastupdated": newOrder.createdAt,
        "orderId": newOrder._id,
        "priority": newOrder.createdAt.getTime(),
        "quantity": newOrder.pizzaorder[0].quantity,
        "status": "active"
    }
    console.log("zeek the zipper zapper")
 
    const updateKitchen = await Kitchen.findOneAndUpdate(
        { _id: nowkitchen[0]._id },
        { $push: { queue: newjob } },
        { new: true }
    )
    console.log('updateKitchen', updateKitchen)
    process.exit(0);
})


// OrderCreation();
// export function removefromqueue(){
    
// }