import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_KITCHENQUEUE } from '../utils/queries'

function KitchenQ () {
    const {data} = useQuery(QUERY_KITCHENQUEUE);
    let user;

    if (data) {
        user = data.user;
    }

    // return (
    // <>
    //     <div className="container my-1">
    //         <Link to="/"> ← Back to Pizza Menus</Link>

    //         {user ?(
    //             <>  
    //                 <h1>
    //                     Kitchen Queue
    //                 </h1>
    //                 <h3>
    //                     Orders currently in the kitchen
    //                 </h3>
    //                 <div key={order._id} className="my-2">
    //                     {order.kitchenToday.map(({_id, priority, commitTime}, index) => (
    //                         <div key={index} className="card px-1 py-1">
    //                             <ul>
    //                                 <li>{name}</li>
    //                             </ul>
    //                         </div>    
    //                     ))}

    //                 </div>

    //             </> 
    //         ) : null
    //         }
    //     </div>
    // </>
    // )
}



export default KitchenQ;