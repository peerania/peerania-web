/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import EditProfilePage from 'containers/EditProfilePage/Loadable';
import ViewProfilePage from 'containers/ViewProfilePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SignUp from 'containers/SignUp';
import Login from 'containers/Login';
import Header from 'containers/Header';
import Toast from 'containers/Toast';
import Questions from 'containers/Questions/Loadable';
import AskQuestion from 'containers/AskQuestion/Loadable';

import Footer from 'components/Footer/Loadable';
import NoAccess from 'components/NoAccess/Loadable';

import * as routes from 'routes-config';

export default function App() {
  return (
    <div>
      <Toast />
      <Header />
      <Switch>
        <Route exact path={routes.home()} component={HomePage} />
        <Route exact path={routes.profile_view()} component={ViewProfilePage} />
        <Route path={routes.profile_edit()} component={EditProfilePage} />
        <Route exact path={routes.questions()} component={Questions} />
        <Route path={routes.question_ask()} component={AskQuestion} />
        <Route path={routes.no_access()} component={NoAccess} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      <SignUp />
      <Login />
    </div>
  );
}
