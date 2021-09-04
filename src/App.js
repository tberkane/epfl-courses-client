import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableGroupRow } from 'material-table';
import CustomGroupRow from './components/CustomGroupRow';

export default function App() {
  const [data, setData] = useState([]);

  /*  const columns = [
    {
      title: 'Group',
      field: 'group',
      defaultGroupOrder: 0,
    },
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Teachers',
      field: 'teachers',
    },
    {
      title: 'Section',
      field: 'section',
    },
    {
      title: 'Credits',
      field: 'credits',
      type: 'numeric',
    },
  ]; */
  const columns = [
    {
      title: 'Group',
      field: 'group',
      defaultGroupOrder: 0,
      width: 0,
      cellStyle: { whiteSpace: 'nowrap' },
    },
    {
      title: 'Code',
      field: 'code',
      width: '10%',
      cellStyle: { whiteSpace: 'nowrap' },
    },
    {
      title: 'Name',
      field: 'name',
      width: '50%',
      cellStyle: { whiteSpace: 'nowrap' },
    },
    {
      title: 'Teachers',
      field: 'teachers',
      width: '30%',
      cellStyle: { whiteSpace: 'nowrap' },
    },
    {
      title: 'Section',
      field: 'section',
      width: '5%',
      cellStyle: { whiteSpace: 'nowrap' },
    },
    {
      title: 'Credits',
      field: 'credits',
      type: 'numeric',
      width: '5%',
      cellStyle: { whiteSpace: 'nowrap' },
    },
  ];

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  return (
    <div style={{ maxWidth: '60%', margin: 'auto' }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="EPFLCourses"
        options={{
          filtering: true,
          draggable: false,
          paging: false,
        }}
        components={{
          GroupRow: (props) => <CustomGroupRow {...props} />,
        }}
      />
    </div>
  );
}
