import React, { useState } from 'react';
import './styles/style.css';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import CourseTable from './components/CourseTable';
import Sidebar from './components/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function App() {
  const [section, setSection] = useState('');

  const classes = useStyles();

  function handleSectionChange(newSection) {
    setSection(newSection);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar
        onSectionChange={handleSectionChange}
        section={section}
      ></Sidebar>
      <div style={{ width: '80%', float: 'right' }}>
        <CourseTable section={section}></CourseTable>
      </div>
    </div>
  );
}
