const db = require('../config/connection');
const { PizzaOrder, Kitchen , Order, History, Profile , Jobs} = require('../models');
const neworder = {

}
const capacity = 20;
const avgcooktime = 15;
const names = ["John Smith","Eleanor Rigsby","Slyvia Hampton","Mickey Mango"]
const ids = ["616907aae00c978118f0ca75","616907aae00c978118f0ca79","616907aae00c978118f0ca77","616907aae00c978118f0ca7b"]
const phn = [3605551430,3607708934,3606509494,3601234567]
function  createnewOrder(){
    let qty=Math.ceil(2*Math.random())
    let indx = Math.floor(4*Math.random())
    let neworder = {
   "name": names[indx],
   "price": 21*qty,
   "phone":phn[indx],
   "status":'prelim',
   "commitTime": "2021-09-29 04:46:21.328Z",
   "pizzaorder":{
       "quantity":qty,
       "size": "large",
       "toppings": "Cheese, Pepperoni",
       "crust": "thick"
   }

    }
     
    return neworder
}

async function  addtoqueue(neworder){
let qtime;
try{
console.log("zeek the zipper zapper")

//get queue from the kitchen
const nowqueue= await Kitchen.find({});
console.log(nowqueue[0].queue)
// console.log(queue)
let newqueue = nowqueue[0].queue
//Find totalnumber of pizzas active and not completed in the queue
let inprog = newqueue.filter(({status}) => status !== 'complete').reduce((total, obj) => obj.quantity + total,0)

//Set qtime
if(inprog < capacity){
   qtime=avgcooktime;
}
else{
   qtime= Math.ceil(avgcooktime*(inprog-capacity)/capacity)+15;
}
console.log(`your pizza will ready in ${qtime} minutes`)

let newjob= {
    "lastupdated": neworder.createdAt,
    "orderId": neworder._id,
    "priority": neworder.createdAt.getTime(),
    "quantity": neworder.pizzaorder.quantity,
    "status": "active"
}
const updateKitchen = await Kitchen.findOneAndUpdate(
    { _id: "61690fd3f8d255891006c009" },
    { $push: { queue: newjob } },
    { new: true }
  )
// queuenow=nowqueue[0].queue;
console.log(updateKitchen)
// let sortqueuenow = queuenow.sort((a, b) => (a.priority > b.priority ? 1 : -1));

}
catch(error){
    console.log(error)
}
console.log('all done!');
process.exit(0);
}

// addtoqueue(createnewOrder());
async function OrderCreation(){
let inputneworder=createnewOrder();
const newOrder =  await Order.create(inputneworder);
console.log(newOrder);
addtoqueue(newOrder)
process.exit(0);
}

OrderCreation();
// export function removefromqueue(){
    
// }