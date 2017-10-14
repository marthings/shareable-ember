import Ember from 'ember';
import RSVP from 'rsvp';
import signInUserMutation from 'shareable-ember/gql/mutations/signInUser';
import createUser from 'shareable-ember/gql/mutations/createUser';

// 1.
const GC_USER_ID = 'graphcool-user-id';
const GC_AUTH_TOKEN = 'graphcool-auth-token';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    // 2.
    this.getUserId();
    this.getAuthToken();
  },

  authToken: null,

  // 3.
  getUserId() {
    const userId = localStorage.getItem(GC_USER_ID);
    this.setUserId(userId);
    return userId;
  },

  getAuthToken() {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    this.setAuthToken(token);
    return token;
  },

  // 4.
  removeUserId() {
    localStorage.removeItem(GC_USER_ID);
    this.set('userId', null);
  },

  removeAuthToken() {
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.set('authToken', null);
  },

  // 5.
  setUserId(id) {
    localStorage.setItem(GC_USER_ID, id);
    this.set('userId', id);
  },

  setAuthToken(token) {
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.set('authToken', token);
  },

  userId: null,
  
  apollo: Ember.inject.service(),
  
  // 1.
  isLoggedIn: Ember.computed('userId', function() {
    return !!this.get('userId');
  }),

  // 2.
  loginOrSignUp(state, name, email, password) {
    let variables;
    return new RSVP.Promise((resolve, reject) => {
      if (state) {
        variables = { email, password };
        this.get('apollo')
          .mutate({ mutation: signInUserMutation, variables }, 'signinUser')
          .then(result => {
            this.saveUserData(result.user.id, result.token);
            resolve();
          })
          .catch(error => reject(error));
      } else {
        variables = { name, email, password };
        this.get('apollo')
          .mutate({ mutation: createUser, variables }, 'signinUser')
          .then(result => {
            this.saveUserData(result.user.id, result.token);
            resolve();
          })
          .catch(error => reject(error));
      }
    });
  },

  // 3.
  logout() {
    return new RSVP.Promise(resolve => {
      this.removeUserId();
      this.removeAuthToken();
      resolve();
    });
  },

  // 4.
  saveUserData(id, token) {
    this.setUserId(id);
    this.setAuthToken(token);
  }
});