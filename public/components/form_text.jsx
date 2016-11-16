import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
  
const FormText = (props) => {
  return (
    <FormGroup controlId={'formInline'+props.type}>
      <ControlLabel>city</ControlLabel>
      <FormControl
        onChange={props.handleChange({props.type})}
        type={props.type}
        placeholder={props.egText}/>
    </FormGroup>
  )
}

export default FormText;
