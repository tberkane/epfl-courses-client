export default function SpecializationsCell(props) {
  return (
    <div style={{ minWidth: '180px' }}>
      <ul style={{ padding: 0, 'list-style-type': 'circle' }}>
        {props.specializations.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  );
}
