import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('links', { path: '/' });
  this.route('link', { path: '/link/:id' });
  this.route('create');
  this.route('login');
});

export default Router;
