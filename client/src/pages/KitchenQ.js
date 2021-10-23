import React from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { useQuery } from '@apollo/client';
import { QUERY_KITCHENQUEUE } from '../utils/queries';
import mockdata from '../utils/mockdata.json';
import Moment from 'moment'
import { ADD_ORDER_KITCHEN} from '../utils/mutations';
import {ADD_ORDER} from '../utils/mutations'
import  '../utils/table.css'

function Table ({columns, data}) {
 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })

    return (
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
        
    )
}

  function KitchenQ() {
   const {loading, data:quedata} = useQuery(QUERY_KITCHENQUEUE);
  
   const  bqueue=quedata.kitchentoday.queue;
   console.log(quedata)
  
  // const bqueue=quedata.kitchentoday.queue;
  //  for (let x = 0;x < bqueue.length; x++) {
  //     bqueue[x].pizzas = bqueue[x].pizzas.join()
  // }
  
  // orderId: '6171b2a1e69ffd25fcda4673', priority: '1634880161291', commitTime: '1634881061291', pizzas: Array(3

  // console.log(bqueue[0] )
  // console.log('from the nqueue kitchen',quedata.kitchentoday.queue[0].pizzas.join() )
    //Define columns
    const columns = React.useMemo(() => [
        {
            Header: 'Pizza #',
            accessor: (row, i) =>i+1,
        },
        {
            Header: 'Order #',
            accessor: 'orderId'
        },
        {
            Header: 'Item Ordered',
            accessor: 'piz'
        },
        
        {
            Header: 'Status',
            accessor: 'statuscommitTime'
        }

    ])

    const data = React.useMemo(() => mockdata, [])


    return(
        <>
        <div className="container my-1">
        <Link to="/"> ← Back to Pizza Menus</Link>
        <br />
        
            <h1>
                Kitchen Queue <br /><br />
            </h1>

            <h3>
                Orders currently in the kitchen today {Moment().format('MMM d, YYYY')}<br /><br />
            </h3>
          
            <Table columns={columns} data={data}/>
            
        </div>
        </>
    )
}

export default KitchenQ;