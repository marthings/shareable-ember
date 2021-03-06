import Ember from 'ember';
import UnsubscribeRoute from 'ember-apollo-client/mixins/unsubscribe-route';
import query from 'shareable-ember/gql/queries/allLinks';

export default Ember.Route.extend(UnsubscribeRoute, {

  apollo: Ember.inject.service(),

  model() {
    return this.get('apollo').watchQuery({ query }, 'allLinks').catch(error => alert(error));
  }
});