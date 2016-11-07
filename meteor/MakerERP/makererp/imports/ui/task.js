import { Template } from 'meteor/templating';
import{ Tasks } from '../api/tasks.js';
import{ Daylis } from '../api/tasks.js';
import './task.html'
// use  Roles.addUsersToRoles( userId, [ 'roleOne', 'roleTwo', 'roleThree' ] ); to add roles
// use Meteor.users.find().fetch() to check if role was given


/*  Template.task.helpers({
    exp: function () {
      var exp = $("input[name=exp]").val();
      return exp;
    },
    gold: function () {
      var gold = $("input[name=gold]").val();
      return gold;
    },
    dmge: function () {
      var dmge = $("input[name=DMG]").val();
      return dmge;
    }
  });
*/

Template.thabit.events({
  'click .toggle-checked'(){
    if (Meteor.user().username == this.username || Roles.userIsInRole( Meteor.userId(), 'admin' )){
    Tasks.update(this._id, {
    $set: { checked: ! this.checked },
  });
  }
},
  'click .delete'(){
    if (Roles.userIsInRole( Meteor.userId(), 'admin' )){
    Tasks.remove(this._id);
  }
  },
});
Template.tdaily.events({
  'click .toggle-checked'(){
    if (Meteor.user().username == this.username || Roles.userIsInRole( Meteor.userId(), 'admin' )){
    Tasks.update(this._id, {
    $set: { checked: ! this.checked },
  });
  }
},
  'click .delete'(){
    if (Roles.userIsInRole( Meteor.userId(), 'admin' )){
    Tasks.remove(this._id);
  }
  },
});
