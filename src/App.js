import React, { useState, useEffect } from 'react';
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
    /*     {
      title: 'Code',
      field: 'code',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
    }, */
    {
      title: 'Name',
      field: 'name',
      cellStyle: {
        padding: '5px',
      },
      render: (rowData) => (
        <div style={{ minWidth: '200px' }}>
          {rowData.link ? (
            <a href={rowData.link} target="_blank" rel="noreferrer">
              {rowData.code + ' ' + rowData.name}
            </a>
          ) : (
            rowData.code + ' ' + rowData.name
          )}
        </div>
      ),
    },
    {
      title: 'Teachers',
      field: 'teachers',
      cellStyle: {
        padding: '5px',
      },
      render: (rowData) => (
        <div style={{ minWidth: '140px' }}>
          {rowData.teachers.map((t, i) => [
            i > 0 && ', ',
            rowData.teacher_links[i] ? (
              <a
                href={rowData.teacher_links[i]}
                target="_blank"
                rel="noreferrer"
              >
                {t}
              </a>
            ) : (
              t
            ),
          ])}
        </div>
      ),
    },
    /* {
      title: 'Section',
      field: 'section',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
    }, */
    {
      title: 'Language',
      field: 'language',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
    },
    {
      title: 'Hours',
      field: 'hours',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
      render: (rowData) => rowData.hours.join('/'),
    },
    {
      title: 'Specializations',
      field: 'specializations',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
      render: (rowData) => (
        <ul style={{ padding: 0, 'list-style-type': 'none' }}>
          {rowData.specializations.map((t) => (
            <li>{t}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Semester',
      field: 'semester',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
    },
    {
      title: 'Exam',
      field: 'exam_type',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
    },
    {
      title: 'Credits',
      field: 'credits',
      type: 'numeric',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '5px',
      },
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
          headerStyle: {
            position: 'sticky',
            top: 0,
            whiteSpace: 'nowrap',
            padding: '5px',
          },
          maxBodyHeight: height - 81,
        }}
        components={{
          GroupRow: (props) => <CustomGroupRow {...props} />,
        }}
      />
    </div>
  );
}
//padding
