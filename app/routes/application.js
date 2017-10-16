import Ember from 'ember';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import query from "shareable-ember/gql/queries/currentUser";

export default Ember.Route.extend(RouteQueryManager, {

  model() {
    return this.get('apollo').query({ query }, 'user').catch(error => alert(error));
  },
  actions: {
    navigateHome() {
      this.transitionTo('/');
    }
  }
});