import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/app';
import Nav from './containers/nav';
import Listings from './containers/listings-page';
import Splash from './components/splashpage';
import ListingPage from './containers/listing-page';
import ListingPageEdit from './components/listing/edit/listing_page_edit';
import AddListing from './components/add_listing_page';
import SignIn from './components/profile/sign_in';
import SignUp from './components/profile/sign_up';
import UserProfile from './containers/user-profile';
import AppView from './components/apply_display';
import AppForm from './components/apply_form';
import AppHistory from './components/apply_rental_History';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Splash} />
    <Route path="content" component={Nav}>
      <Route path="signup" component={SignUp} />
      <Route path="signin" component={SignIn} />
      <Route path="profile/:id" component={UserProfile} />
      <Route path="listings" component={Listings} />
      <Route path="listing/:id" component={ListingPage} />
      <Route path="editListing/:id" component={ListingPageEdit} />
      <Route path="addListing" component={AddListing} />
      <Route path="application/view/:id" component={AppView} />
      <Route path="application/form" component={AppForm} />
      <Route path="application/view/:id/history" component={AppHistory} />
    </Route>
  </Route>
);
