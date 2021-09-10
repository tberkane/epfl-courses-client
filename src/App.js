import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import CustomGroupRow from './components/CustomGroupRow';
import { useWindowResize } from './hooks/useWindowResize';
import './styles/style.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import WorkloadSquare from './components/WorkloadSquare';
import Workload from './components/Workload';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [section, setSection] = useState('');
  const { height } = useWindowResize();

  const sections = {
    'Applied Mathematics': 'applied-mathematics',
    'Applied Physics': 'applied-physics',
    Architecture: 'architecture',
    'Chemical Engineering and Biotechnology':
      'chemical-engineering-and-biotechnology',
    'Civil Engineering': 'civil-engineering',
    'Communication Systems - master program':
      'communication-systems-master-program',
    'Computational science and Engineering':
      'computational-science-and-engineering',
    'Computer Science': 'computer-science',
    'Computer Science - Cybersecurity': 'computer-science-cybersecurity',
    'Data Science': 'data-science',
    'Digital Humanities': 'digital-humanities',
    'Electrical and Electronics Engineering':
      'electrical-and-electronics-engineering',
    'Energy Management and Sustainability':
      'energy-management-and-sustainability',
    'Energy Science and Technology': 'energy-science-and-technology',
    'Environmental Sciences and Engineering':
      'environmental-sciences-and-engineering',
    'Financial engineering': 'financial-engineering',
    'Humanities and Social Sciences Program':
      'humanities-and-social-sciences-program',
    'Life Sciences Engineering': 'life-sciences-engineering',
    'Management, Technology and Entrepreneurship':
      'management-technology-and-entrepreneurship',
    'Materials Science and Engineering': 'materials-science-and-engineering',
    'Mathematics - master program': 'mathematics-master-program',
    'Mechanical Engineering': 'mechanical-engineering',
    'Micro- and Nanotechnologies for Integrated Systems':
      'micro-and-nanotechnologies-for-integrated-systems',
    Microengineering: 'microengineering',
    'Molecular & Biological Chemistry': 'molecular-biological-chemistry',
    'Nuclear engineering': 'nuclear-engineering',
    'Physics - master program': 'physics-master-program',
    Robotics: 'robotics',
    'Sustainable Management and Technology':
      'sustainable-management-and-technology',
  };

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
      render: (rowData) => <Workload hours={rowData.hours}></Workload>,
    },
    {
      title: 'Specializations',
      field: 'specializations',
      cellStyle: {
        padding: '10px',
      },
      render: (rowData) => (
        <div style={{ minWidth: '180px' }}>
          <ul style={{ padding: 0, 'list-style-type': 'circle' }}>
            {rowData.specializations.map((t) => (
              <li>{t}</li>
            ))}
          </ul>
        </div>
      ),
    },
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
    fetch('http://localhost:3000/courses/' + section)
      .then((response) => response.json())
      .then((response) => setData(response));
  }, [section]);

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {Object.keys(sections).map((text) => (
            <ListItem
              button
              onClick={() => {
                setSection(sections[text]);
              }}
              disableRipple
              selected={section === sections[text]}
              key={text}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div style={{ maxWidth: '80%', float: 'right' }}>
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
    </div>
  );
}
