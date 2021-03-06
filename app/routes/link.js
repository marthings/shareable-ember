import Ember from "ember";
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import query from "shareable-ember/gql/queries/link";

export default Ember.Route.extend(RouteQueryManager, {
  apollo: Ember.inject.service(),
  model(params) {
    let variables = { id: params.id };
    return this.apollo.watchQuery({ query, variables }, 'Link').catch(error => alert(error));
  }
});