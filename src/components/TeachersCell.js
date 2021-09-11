export default function TeachersCell(props) {
  return (
    <div style={{ minWidth: '140px' }}>
      {props.teachers.map((t, i) => [
        i > 0 && ', ',
        props.teacherLinks[i] ? (
          <a href={props.teacherLinks[i]} target="_blank" rel="noreferrer">
            {t}
          </a>
        ) : (
          t
        ),
      ])}
    </div>
  );
}
