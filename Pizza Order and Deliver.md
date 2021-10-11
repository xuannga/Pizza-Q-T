# Pizza Order and Delivery
## User Story
Friday Night is Pizza night and we want our delivery on time !  As a small time pizza shop owner we want to provide the best, reliable delivery time possible to delight our customers.  This application allows customers to order online and get reliable delivery/pickup times while enabling the kitchen to plan and execute efficiently.  


## Application Design and Features 

1. MERN fullstack Application  with :
     MongoDB database with three Tables - Collection of Order Document, Collection  of Production Document, Collection of Historical Document

2. Flow Action : 

    1 - User opens app and makes pizza order including when they want the pizza ready.

    2 - Kitchen reviews order and queue of orders and determines best ready time and sends back to user to confirm. 
    (reserves the spot until user responds within 5 mins)

    3 - User accepts (or rejects) the ready time 
    
    4 - If user accepts then kitchen schedules the order

3. IndexDB implementation to enable offline functionality.

4. Features (MVP unless otherwise noted) :
- MERN application
- Order and Confirm feature
- Schedule orders FIFO using queue
- Store Order and Production document(s) in History at end of the 3 hour shift.  Standard process time based on queue.
- JWT authentication - George M.
- Payment Platform - Na.
- IndexDB (nice to have)
- Order status feature - text/email notification (nice to have)
- Delivery Options (nice to have)

## Schema
### 1. Order Document
- Name
- _id
- email ?
- phone
- Date,Time of Order
- Credit Card Number
- Request Complete time
- Pizza Items (Size, Qty, Ingredients)
- Price 
- Delivery Venue (?)
- Confirmation Ready Time
- Order Status (Prelim, InProgress, Complete)

### 2. Production Document
- _id
- order id (reference)
- Date
- Pizza Items
- Ready Time Commit
- Start Time Schedule
- Production Status (Unconfirmed, InProgress, Complete)

### 3. Historical Document
- Date
- Total Orders completed
- Ontime Performance
- Orders Declined

##  Logistics
- Queue is FIFO 
- Time buckets are on the minute or could be every 5 minutes with 6-9pm (180 mins) nightly schedule.
- Orders are filled to meet customer requests or as soon as possible after request time.
- Orders move from Preliminary to InProgress after customer confirms order.
- Production documents are retired at end of the 3 hour shift.
- Order documents are stored/retired at order completion
- Pizza shop has capacity constraints : 24 large pizzas in oven maximum (32 mediums with a table constraint), 
- Cooktime is 10 mins, prep and box time is 2 mins for all sizes.
- Reports/data collected - total orders per evening, ontime deliveries, orders turned away. These go into the Historical document.
- JWT :  signin as guest or as a user


# Pages
Client-side
1. Menu/order page
2. Directions and Contacts
3. Payment 
4. Sign-In (guest or member) ??

Kitchen
1. Scheduler
