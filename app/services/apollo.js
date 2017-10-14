import Ember from 'ember';
import ApolloService from 'ember-apollo-client/services/apollo';
import middlewares from 'ember-apollo-client/utils/middlewares';

// 1.
export default ApolloService.extend({
  // 2.
  middlewares: middlewares('authorize'),

  auth: Ember.inject.service(),

  // 3.
  authorize(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = this.get('auth').getAuthToken();
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
});
