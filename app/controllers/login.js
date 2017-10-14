import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    // 1.
    changeLoginState() {
      this.toggleProperty('loginState');
    },

    // 2.
    loginOrSignUp() {
      const loginState = this.loginState;
      const email = this.get('email');
      const name = this.get('name');
      const password = this.get('password');
      return this.get('auth')
        .loginOrSignUp(loginState, name, email, password)
        .then(() => {
          this.transitionToRoute('/');
        })
        .catch(error => alert(error));
    }
  },

  auth: Ember.inject.service(),

  // 3.
  loginState: true
});