import React from 'react';
import compareListings from '../public/actions/compare_listings';
import reducerCompareListings from '../public/reducers/reducer_compare_listings';

describe('compareListings', () => {
  it('should be a function', () => {
    expect(compareListings).toEqual(jasmine).any(Function);
  });
});

describe('reducerCompareListings', () => {
  it('should be function', () => {
    expect(reducerActiveCity).toEqual(jasmine).any(Function)
  });
});


describe('actions' , () => {
  it('should create an action to change the city', () => {
    const listings = [
    {
        availableDate: "2016-11-07T00:00:00.000Z",
        baths: 1.5,
        beds:2,
        cats:true,
        city:{ city_id:1, createdAt:"2016-11-24T00:56:03.000Z" },
        dogs:true,
        host_id:1,
        id:1,
        images: [],
        lat:37.782646,
        laundry:"In Unit",
        lon:-122.39257,
        parking:"2",
        rent:5000,
        smoking:false,
        sqFoot:893,
        street:"239 Brannan St",
        term:12,
        transitScore:null,
        unitNumber:"2G",
        updatedAt: "2016-11-24T00:56:03.000Z",
        walkScore: '',
        zip:94107
      }, {
        availableDate: "2016-11-07T00:00:00.000Z",
        baths: 1.5,
        beds:2,
        cats:true,
        city:{ city_id:1, createdAt:"2016-11-24T00:56:03.000Z" },
        dogs:true,
        host_id:1,
        id:1,
        images: [],
        lat:37.782646,
        laundry:"In Unit",
        lon:-122.39257,
        parking:"2",
        rent:5000,
        smoking:false,
        sqFoot:893,
        street:"239 Brannan St",
        term:12,
        transitScore:null,
        unitNumber:"2G",
        updatedAt: "2016-11-24T00:56:03.000Z",
        walkScore: '',
        zip:94107
      }
]
    const extpectAction = {
      type: 'LISTINGS_COMPARED',
      payload: listings
    };
    expect(compareListings(listings)).toEqual(expectedAction);
  })
})
