import { useQuery } from '@apollo/client'
import React, {useMemo} from 'react'
import { useTable } from 'react-table'
import { QUERY_KITCHENQUEUE } from '../../utils/queries';
import MOCK_DATA from '../../utils/mockdata.json'
import  '../../utils/table.css'

const COLUMNS = [
  {
      Header: 'OrderId',
      accessor: 'orderId'
  },
  {
      Header: 'Pizzas',
      accessor: 'pizzas'
  },
  {
      Header: 'Priority',
      accessor: 'priority'
  },
  {
      Header: 'Status',
      accessor: 'status'
  }

]

 const KitchenQueue = () => {
  // const {loading, data:quedata} = useQuery(QUERY_KITCHENQUEUE,{
  //   variables: { _id: "617053975ef3373254013c90" },

  // })
  // console.log('kitchenqueue',quedata.kitchentoday.queue)
  // let nowqueue = quedata.kitchentoday.queue.map((e)=>(e.pizzas.toString()) );
  // console.log(nowqueue)
  const columns = useMemo(()=> COLUMNS,[])
  const data = useMemo(()=> MOCK_DATA,[])

  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps,
     headerGroups, rows, prepareRow} = tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column)=> (
          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
          </tr>
         ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return(
        <tr {...row.getRowProps()}>
          {
            row.cells.map((cell)=>{
              return <td {...cell.getCellProps()}>
                {cell.render('Cell')}
              </td>
            })}
        </tr>
        )
        })}
      </tbody>
    </table>
  )
}

export default KitchenQueue;