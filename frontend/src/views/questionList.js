// // src/components/QuestionList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useTable, useFilters } from 'react-table';
// import { Link } from 'react-router-dom';
// import './questionList.css'

// const QuestionList = () => {
//   const api = axios.create({
//     baseURL: process.env.REACT_APP_API_BASE_URL,
//   });
//   const [questions, setQuestions] = useState([]); // State for questions

//   // const QuestionLink = ({ value, row }) => (
//   //   <Link to={`/questions/${row.original.id}`}>{value}</Link>
//   // );

//   const columns = React.useMemo(
//     () => [
//       { Header: 'ID', accessor: 'id' },
//       {
//         Header: 'Question Name',
//         accessor: 'question_name',
//         Cell: ({ value, row }) => (
//           <Link to={`/questions/${row.original.id}`}>{value}</Link>
//         ),
//       },
//       // { Header: 'Description', accessor: 'description' },
//       { Header: 'Difficulty', accessor: 'difficulty' },
//       { Header: 'Status', accessor: 'status' },
//       { Header: 'Tags', accessor: 'tags' },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     // columns,
//     // data: questions, // Use the state variable for data
//       columns,
//       data:questions,
// }, useFilters);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const response = await api.get('/api/questions'); // Replace with your API endpoint
//       setQuestions(response.data); // Update the state with fetched questions
//     } catch (error) {
//       console.error('Failed to fetch questions:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Question List</h1>
//       <table {...getTableProps()} className="table">
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   if (cell.column.id === 'is_premium') {
//                     // If the cell value is true, display "Premium", otherwise display nothing
//                     return (
//                         <td {...cell.getCellProps()}>
//                             {cell.value ? <span className="premium-badge">Premium</span> : null}
//                         </td>
//                     );
//                   }
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuestionList;
