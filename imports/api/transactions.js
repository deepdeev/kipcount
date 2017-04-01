import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Transactions = new Mongo.Collection('transactions');

if (Meteor.isClient) {
  Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
  });
  Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameVar = event.target.registerUsername.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            username: usernameVar,
            password: passwordVar
        });
    }
  },
  {
    'click #loginBB': function(event){
        event.preventDefault();
        console.log("holle");
        var usernameVar = event.target.registerUsername.value;
        var passwordVar = event.target.registerPassword.value;
        Meteor.loginWithPassword(usernameVar, passwordVar);

    }
  }
);
  Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameVar = event.target.loginUsername.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(usernameVar, passwordVar);
    }
  });
}


if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('transactions', function tasksPublication() {
    return Transactions.find({
      owner: this.userId
    });
  });
}

Meteor.methods({
  'transactions.insert'(transaction) {
    // Make sure the user is logged in before inserting a transaction
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    transaction.owner = this.userId;
    transaction.username = Meteor.users.findOne(this.userId).username;
    console.log(transaction);
    Transactions.insert(transaction);
  },
});
