import Ember from "ember";
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import query from "hackernews-ember-apollo/gql/queries/link";

export default Ember.Route.extend(RouteQueryManager, {
  model(params) {
    let variables = { id: params.id };
    return this.get('apollo').query({ query, variables }, 'Link').catch(error => alert(error));
  }
});