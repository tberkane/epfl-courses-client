import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

export default function App() {
  const [data, setData] = useState([]);

  const columns = [
    { title: 'Code', field: 'code' },
    { title: 'Name', field: 'name' },
    { title: 'Teachers', field: 'teachers' },
    { title: 'Sections', field: 'sections' },
    { title: 'Credits', field: 'credits', type: 'numeric' },
  ];

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="Courses"
        options={{
          filtering: true,
        }}
      />
    </div>
  );
}
