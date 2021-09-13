import React from 'react';
import WorkloadSquare from './WorkloadSquare';

/* Represents a course's workload as little colored squares */
export default class WorkloadCell extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          {!!this.props.hours[0] && <h5 className="workload-header-l">L</h5>}
          {[...Array(this.props.hours[0]).keys()].map(() => (
            <WorkloadSquare type="lecture"></WorkloadSquare>
          ))}
        </div>
        <div>
          {!!this.props.hours[1] && <h5 className="workload-header-e">E</h5>}
          {[...Array(this.props.hours[1]).keys()].map(() => (
            <WorkloadSquare type="exercises"></WorkloadSquare>
          ))}
        </div>
        <div>
          {!!this.props.hours[2] && <h5 className="workload-header-p">P</h5>}
          {[...Array(this.props.hours[2]).keys()].map(() => (
            <WorkloadSquare type="practice"></WorkloadSquare>
          ))}
        </div>
      </div>
    );
  }
}
