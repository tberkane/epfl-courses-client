import React, { useState, useEffect } from 'react';
//import MaterialTable from 'material-table';
import MaterialTable from '@material-table/core';
import CustomGroupRow from './components/CustomGroupRow';
import { useWindowResize } from './hooks/useWindowResize';

export default function App() {
  const [data, setData] = useState([]);
  const { height } = useWindowResize();

  const columns = [
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
      render: (rowData) => (
        <a href={rowData.link} target="_blank" rel="noreferrer">
          {rowData.name}
        </a>
      ),
    },
    {
      title: 'Teachers',
      field: 'teachers',
      render: (rowData) =>
        rowData.teachers.map((t, i) => [
          i > 0 && ', ',
          <a href={rowData.teacher_links[i]} target="_blank" rel="noreferrer">
            {t}
          </a>,
        ]),
    },
    {
      title: 'Section',
      field: 'section',
    },
    {
      title: 'Language',
      field: 'language',
    },
    {
      title: 'Hours',
      field: 'hours',
      render: (rowData) => rowData.hours.join('/'),
    },
    {
      title: 'Specializations',
      field: 'specializations',
      render: (rowData) => (
        <ul>
          {rowData.specializations.map((t) => (
            <li>{t}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Semester',
      field: 'semester',
    },
    {
      title: 'Exam',
      field: 'exam_type',
    },
    {
      title: 'Credits',
      field: 'credits',
      type: 'numeric',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  return (
    <div style={{ maxWidth: '70%', margin: 'auto' }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="EPFLCourses"
        options={{
          draggable: false,
          paging: false,
          showEmptyDataSourceMessage: false,
          headerStyle: { position: 'sticky', top: 0 },
          maxBodyHeight: height - 81,
        }}
        components={{
          GroupRow: (props) => <CustomGroupRow {...props} />,
        }}
      />
    </div>
  );
}
