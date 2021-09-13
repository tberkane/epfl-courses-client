import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';

export default function FilterForm(props) {
  const [specializationItems, setSpecializationItems] = useState();

  useEffect(() => {
    setSpecializationItems(
      props.specializations.map((s) => <MenuItem value={s}>{s}</MenuItem>)
    );
  }, [props.specializations]);

  return (
    <div>
      <FormControl variant="outlined" margin="dense">
        <InputLabel id="semester-label">Semester</InputLabel>
        <Select
          labelId="semester-label"
          id="semester-select"
          style={{ width: 115 }}
          value={props.semester}
          onChange={(e) => props.onSemesterChange(e.target.value)}
          label="Semester"
        >
          <MenuItem value={''}>
            <em>Any</em>
          </MenuItem>
          <MenuItem value={'Fall'}>Fall</MenuItem>
          <MenuItem value={'Spring'}>Spring</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" margin="dense" style={{ marginLeft: 5 }}>
        <InputLabel id="specialization-label">Specialization</InputLabel>
        <Select
          labelId="specialization-label"
          id="specialization-select"
          style={{ width: 215 }}
          value={props.specialization}
          onChange={(e) => props.onSpecializationChange(e.target.value)}
          label="Specialization"
        >
          <MenuItem value={''}>
            <em>Any</em>
          </MenuItem>
          {specializationItems}
        </Select>
      </FormControl>
    </div>
  );
}
