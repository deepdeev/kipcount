import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Transactions = new Mongo.Collection('transactions');

Meteor.methods({
  'transactions.insert'(transaction) {
    // Make sure the user is logged in before inserting a transaction
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    transaction.owner = Meteor.userId;
    transaction.username = Meteor.user().username;
    Transactions.insert(transaction);
  },
});
