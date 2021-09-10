import React from 'react';
import WorkloadSquare from './WorkloadSquare';

export default class Workload extends React.Component {
  render() {
    return (
      <div>
        <div>
          {[...Array(this.props.hours[0]).keys()].map((h) => (
            <WorkloadSquare type="lecture"></WorkloadSquare>
          ))}
        </div>
        <div>
          {[...Array(this.props.hours[1]).keys()].map((h) => (
            <WorkloadSquare type="exercises"></WorkloadSquare>
          ))}
        </div>
        <div>
          {[...Array(this.props.hours[2]).keys()].map((h) => (
            <WorkloadSquare type="practice"></WorkloadSquare>
          ))}
        </div>
      </div>
    );
  }
}
