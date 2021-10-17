
 const queue = [
  { 
      "lastupdated": "2021-09-29 04:44:21.328Z",
      "orderId": "616907aae00c978118f0ca75",
      "priority": 1634243786651,
      "status": "active",
      "quantity":1,
      "commitTime": 1634417375460
  },
  {
      "lastupdated": "2021-09-29 04:44:21.328Z",
      "orderId": "616907aae00c978118f0ca77",
      "priority": 1634243786478,
      "status": "active",
      "quantity":2,
      "commitTime": 1634417125460
  },
  {
      "lastupdated": "2021-09-29 04:44:21.328Z",
      "orderId": "616907aae00c978118f0ca79",
      "priority": 1634243786111,
      "status": "inoven",
      "quantity":2,
      "commitTime": 1634417025460
  },
  {
      "lastupdated": "2021-09-29 04:44:21.328Z",
      "orderId": "616907aae00c978118f0ca7b",
      "priority": 1634243786154,
      "status": "complete",
      "quantity":1,
      "commitTime": 1634416925460
  }
]

export function statuschangeJobs(queue){
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

 

 
// setInterval(function(){ 
// 	console.log(new Date().getTime());
// }, 20000);//run this thang every 20 seconds

// console.log( )