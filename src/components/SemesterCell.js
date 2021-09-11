export default function SemesterCell(props) {
    return (
        <ul style={{ padding: 0, 'list-style-type': 'none' }}>
        <li style={{ fontWeight: 'bold' }}>
          {props.semester === 'Fall' ? 'Winter session' : 'Summer session'}
        </li>
        <li>{props.examType}</li>
      </ul>
    );
  }
  