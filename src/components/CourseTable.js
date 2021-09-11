import React, { useState, useEffect } from 'react';
import { useWindowResize } from '../hooks/useWindowResize';
import MaterialTable from '@material-table/core';
import CustomGroupRow from './CustomGroupRow';
import { IconButton, Toolbar } from '@material-ui/core';
import NameCell from './NameCell';
import WorkloadCell from './WorkloadCell';
import TeachersCell from './TeachersCell';
import SpecializationsCell from './SpecializationsCell';
import SemesterCell from './SemesterCell';

/* Table which contains all the course data */
export default function CourseTable(props) {
  const [data, setData] = useState([]);
  const { height } = useWindowResize();

  useEffect(() => {
    fetch('http://localhost:3000/courses/' + props.section)
      .then((response) => response.json())
      .then((response) => setData(response));
  }, [props.section]);

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
        <NameCell
          name={rowData.name}
          link={rowData.link}
          code={rowData.code}
          section={rowData.section}
        ></NameCell>
      ),
    },
    {
      title: 'Teachers',
      field: 'teachers',
      cellStyle: {
        padding: '10px',
      },
      render: (rowData) => (
        <TeachersCell
          teachers={rowData.teachers}
          teacherLinks={rowData.teacher_links}
        ></TeachersCell>
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
      title: 'Workload',
      field: 'hours',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
      customSort: (a, b) =>
        a.hours[0] +
        a.hours[1] +
        a.hours[2] -
        b.hours[0] -
        b.hours[1] -
        b.hours[2],
      render: (rowData) => <WorkloadCell hours={rowData.hours}></WorkloadCell>,
    },
    {
      title: 'Specializations',
      field: 'specializations',
      cellStyle: {
        padding: '10px',
      },
      render: (rowData) => (
        <SpecializationsCell
          specializations={rowData.specializations}
        ></SpecializationsCell>
      ),
    },
    {
      title: 'Semester',
      field: 'semester',
      cellStyle: {
        whiteSpace: 'nowrap',
        padding: '10px',
      },
      render: (rowData) => (
        <SemesterCell
          semester={rowData.semester}
          examType={rowData.exam_type}
        ></SemesterCell>
      ),
    },
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

  return (
    <div>
      <Toolbar />
      <MaterialTable
        columns={columns}
        data={data}
        options={{
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
          maxBodyHeight: height - 129,
          showTitle: false,
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
