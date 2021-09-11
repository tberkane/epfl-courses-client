export default function NameCell(props) {
  return (
    <div style={{ minWidth: '240px' }}>
      {props.link ? (
        <div>
          <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: 'bold' }}
          >
            {props.name}
          </a>
        </div>
      ) : (
        <b>{props.name}</b>
      )}
      <div>{(props.code ? props.code + ' / ' : '') + props.section}</div>
    </div>
  );
}
