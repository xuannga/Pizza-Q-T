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

    module.exports=  { statuschangeJobs, calculatequeuetime}