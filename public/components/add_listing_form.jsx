import React, { Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, DropdownButton, MenuItem, InputGroup, Button}from 'react-bootstrap';

export default class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      unitNumber: 0,
      city: '',
      state: '',
      zip: 0,

      beds: 0,
      baths: 0,
      rent: 0,
      sqFoot: 0,
      dogs: false,
      cats: true,
      term: 0,
      availableDate:  '',
      host_id: 0,
      images: []
    };
  }

    render() {
      return (
        <div className= 'listingForm'>
          <Form inline>
            <FormGroup controlId="formInlineAddress">
              <ControlLabel>address</ControlLabel>
              <FormControl type="address" placeholder="eg. 1060 W. Addison" />
            </FormGroup>
            <FormGroup controlId="formInlineUnit">
              <FormControl type="number" placeholder="unitNumber" />
            </FormGroup>
            <FormGroup controlId="formInlineCity">
              <ControlLabel>city</ControlLabel>
              <FormControl type="city" placeholder=" eg.Chicago" />
            </FormGroup>
            <FormGroup controlId="formInlineState">
              <ControlLabel>state</ControlLabel>
              <FormControl type="state" placeholder=" eg. Illinois" />
            </FormGroup>
            <FormGroup controlId="formInlineZip">
              <ControlLabel>zip</ControlLabel>
              <FormControl type="number" placeholder="60016" />
            </FormGroup>
            <br />

            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title="Beds"
            >
              <MenuItem key="1">1</MenuItem>
              <MenuItem key="2">2</MenuItem>
              <MenuItem key="3">3</MenuItem>
              <MenuItem key="4">4</MenuItem>
              <MenuItem key="5">5</MenuItem>
            </DropdownButton>

            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title="Baths"
            >
              <MenuItem key="1">1</MenuItem>
              <MenuItem key="2">2</MenuItem>
              <MenuItem key="3">3</MenuItem>
              <MenuItem key="4">4</MenuItem>
              <MenuItem key="5">5</MenuItem>
            </DropdownButton>
            <FormGroup controlId="formInlineZip">
              <ControlLabel>sq. foot</ControlLabel>
              <FormControl type="number" placeholder="sq. foot" />
            </FormGroup>
            <FormGroup controlId="formInlineZip">
              <ControlLabel>rent</ControlLabel>
              <FormControl type="number" placeholder="2100" />
            </FormGroup>
            <FormGroup controlId="formInlineZip">
              <ControlLabel>term</ControlLabel>
              <FormControl type="number" placeholder="12" />
            </FormGroup>
            <br />
            <Checkbox inline>
              Dogs
            </Checkbox>
            <Checkbox inline>
              cats
            </Checkbox>
            <br />
            <FormGroup controlId="formInlineZip">
              <ControlLabel>Available Date</ControlLabel>
              <FormControl type="number" placeholder="yyy-mm-dd" />
            </FormGroup>
            <Button type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    };
  }
