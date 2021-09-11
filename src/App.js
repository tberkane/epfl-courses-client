import React, { useState } from 'react';
import './styles/style.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            EPFLCourses
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        onSectionChange={handleSectionChange}
        section={section}
      ></Sidebar>

      <div style={{ maxWidth: '80%', float: 'right' }}>
        <CourseTable section={section}></CourseTable>
      </div>
    </div>
  );
}
