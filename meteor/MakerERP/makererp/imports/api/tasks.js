import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');
export const Daylis = new Meteor.Collection("daylis");
export const Todos = new Meteor.Collection("todos");
export const Rewards = new Meteor.Collection("rewards");

