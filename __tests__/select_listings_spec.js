import React from 'react';
import selectListing from '../public/actions/select_listing';
import ActiveListing from '../public/reducers/reducer_active_listing';

describe('selectListing', () => {
  it('should be a function', () => {
    expect(selectListing).toEqual(jasmine).any(Function);
  });
});

describe('ActiveListing', () => {
  it('should be a function', () => {
    expect(ActiveListing).toEqual(jasmine).any(Function);
  });
});


