import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '20%';
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
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

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {Object.keys(sections).map((text) => (
            <ListItem
              button
              onClick={() => {
                props.onSectionChange(sections[text]);
              }}
              disableRipple
              selected={props.section === sections[text]}
              key={text}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
