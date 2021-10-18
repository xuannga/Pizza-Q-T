const db = require('../config/connection');
 
const { PizzaOrder, Kitchen, Order, History, Profile, Jobs } = require('../models');
const capacity = 20;
const avgcooktime = 15;
const names = ["John Smith", "Eleanor Rigsby", "Slyvia Hampton", "Mickey Mango"]
const ids = ["616907aae00c978118f0ca75", "616907aae00c978118f0ca79", "616907aae00c978118f0ca77", "616907aae00c978118f0ca7b"]
const phn = [3605551430, 3607708934, 3606509494, 3601234567]
function statuschangeJobs(queue){
    let nqueue = [...queue]
    let nnow = Date.now()
    // sort queue
    queue.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
    // mark jobs complete that have passed theri commitTime -assume complete
    let count =0;
    for (let x = 0; x < queue.length; x++) {
      if (queue[x].commitTime < nnow) {
        nqueue.status = 'complete'
      }
      else if (count < capacity) {
        nqueue.status = 'inoven'
      }
      else { nqueue.status = 'active' }
  
      console.log(queue[x].status, queue[x].priority, nqueue[x].priority, nqueue[x].status, nnow)
     }
     return nqueue
    }


function createnewOrder() {
    let qty = Math.ceil(2 * Math.random())
    let indx = Math.floor(4 * Math.random())
    let neworder = {
        "name": names[indx],
        "price": 21 * qty,
        "phone": phn[indx],
        "status": 'active',
        "commitTime": "2021-09-29 04:46:21.328Z",  // dummy date, will update below
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

// Run a seed by entering order ... update Kitchen
db.once('open', async () => {
    // randomly create order from existing Profile base
    let inputneworder = createnewOrder();

    // Load order into Order db 
    // create order in database
    const newOrder = await Order.create(inputneworder);
    console.log('new order1', newOrder);

    //get kitchen for id and latest queue
    const nowkitchen = await Kitchen.find({});
    console.log('nowkitchen',nowkitchen)
    const newqueue = statuschangeJobs(nowkitchen[0].queue);

    // Calculate Qtime and commtTime
    let qtime = calculatequeuetime(inputneworder,newqueue);
    console.log('qtime',qtime);
    const commtTime = Date.now() + qtime*60000;
 
    // Update order to include commitTime
    const updateOrder = await Order.findOneAndUpdate(
        { _id: newOrder._id },
        {  commitTime: commtTime},
        { new: true }
    );

    //TODO: Notify customer of commtTime

    // Add order to kitchen queue by  first creating job
    // Need newOrder information and kitchen id, commtTime

    let newjob = {
        "lastupdated": newOrder.createdAt,
        "orderId": newOrder._id,
        "priority": newOrder.createdAt.getTime(),
        "quantity": newOrder.pizzaorder[0].quantity,
        "status": "active",
        "commitTime":commtTime
    }
    
    // Update kitchen page
    const updateKitchen = await Kitchen.findOneAndUpdate(
        { _id: nowkitchen[0]._id },
        { $push: { queue: newjob } },
        { new: true }
    )

    process.exit(0);
})
