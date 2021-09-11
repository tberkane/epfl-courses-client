import React from 'react';
import '../styles/style.css';

/* A little colored square representing an hour of workload */
export default class WorkloadSquare extends React.Component {
  render() {
    if (this.props.type === 'lecture') {
      return <div className="workload-square-l"></div>;
    } else if (this.props.type === 'exercises') {
      return <div className="workload-square-e"></div>;
    } else {
      return <div className="workload-square-p"></div>;
    }
  }
}
