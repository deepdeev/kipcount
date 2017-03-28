import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Transactions = new Mongo.Collection('transactions');


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
