import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import CustomGroupRow from './components/CustomGroupRow';
import { useWindowResize } from './hooks/useWindowResize';
import './styles/style.css';
import { IconButton } from '@material-ui/core';

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
      title: 'Name',
      field: 'name',
      cellStyle: {
        padding: '10px',
      },
      render: (rowData) => (
        <div style={{ minWidth: '240px' }}>
          {rowData.link ? (
            <div>
              <a
                href={rowData.link}
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 'bold' }}
              >
                {rowData.name}
              </a>
            </div>
          ) : (
            <b>{rowData.name}</b>
          )}
          <div>
            {(rowData.code ? rowData.code + ' / ' : '') + rowData.section}
          </div>
        </div>
      ),
    },
    {
      title: 'Teachers',
      field: 'teachers',
      cellStyle: {
        padding: '10px',
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
    {
      title: 'Language',
      field: 'language',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
    },
    {
      title: 'Hours',
      field: 'hours',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
      render: (rowData) => rowData.hours.join('/'),
    },
    {
      title: 'Specializations',
      field: 'specializations',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
      render: (rowData) => (
        <ul style={{ padding: 0, 'list-style-type': 'none' }}>
          {rowData.specializations.map((t) => (
            <li>{t}</li>
          ))}
        </ul>
      ),
    },
    /* {
      title: 'Semester',
      field: 'semester',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
    }, */
    {
      title: 'Exam',
      field: 'semester',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
      render: (rowData) => (
        <ul style={{ padding: 0, 'list-style-type': 'none' }}>
          <li style={{ fontWeight: 'bold' }}>
            {rowData.semester === 'Fall' ? 'Winter session' : 'Summer session'}
          </li>
          <li>{rowData.exam_type}</li>
        </ul>
      ),
    },
    /* {
      title: 'Exam',
      field: 'exam_type',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
    }, */
    {
      title: 'Credits',
      field: 'credits',
      type: 'numeric',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
    },
  ];

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="EPFLCourses"
        options={{
          filtering: true,
          draggable: false,
          paging: false,
          showEmptyDataSourceMessage: false,
          headerStyle: {
            position: 'sticky',
            top: 0,
            whiteSpace: 'nowrap',
            padding: '10px',
            fontWeight: 'bold',
          },
          maxBodyHeight: height - 81,
        }}
        components={{
          GroupRow: (props) => <CustomGroupRow {...props} />,
        }}
        icons={{
          IconButton: () => <IconButton style={{ color: 'blue' }} />,
        }}
      />
    </div>
  );
}
