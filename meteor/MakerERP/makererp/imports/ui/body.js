import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import { Daylis } from '../api/tasks.js';
import { Todos } from '../api/tasks.js';
import { Rewards } from '../api/tasks.js';
import './task.js';
import './body.html';




Template.body.onCreated(function bodyOnCreated()
{this.state = new ReactiveDict();
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Tasks.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Tasks.find({}, {sort:{createdAt: -1}});
  },  
  daylis() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Daylis.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Daylis.find({}, {sort:{createdAt: -1}});
  },
    todos() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Todos.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Todos.find({}, {sort:{createdAt: -1}});
  },
  rewards() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Rewards.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Rewards.find({}, {sort:{createdAt: -1}});
  },
  incompleteCount(){
    return Tasks.find({checked:{$ne:true}}).count();
  },
    incompleteCount(){
    return Daylis.find({checked:{$ne:true}}).count();
  },
  incompleteCount(){
    return Todos.find({checked:{$ne:true}}).count();
  },
    incompleteCount(){
    return Rewards.find({checked:{$ne:true}}).count();
  },

});

Template.body.events({
  /*'submit .new-task'(event){
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    target.text.value= '';
    target.text2.value='';
  },*/
  'submit #habit-form':function(event){
    event.preventDefault();

    var text = $("input[name=text]").val();
    var exp = $("input[name=exp]").val();
    var gold = $("input[name=gold]").val();
    var dmge = $("input[name=DMG]").val();

    var tasks = {
      text: text,
      exp: exp,
      gold: gold,
      dmge: dmge,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };

    var id = Tasks.insert(tasks);
    console.log(id);

  },
  'submit #dayli-form':function(event){
    event.preventDefault();

    var text = $("input[name=texto]").val();
    var exp = $("input[name=exp]").val();
    var gold = $("input[name=gold]").val();
    var dmge = $("input[name=DMG]").val();
    var daylis = {
      text: text,
      exp: exp,
      gold: gold,
      dmge: dmge,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };

    var id = Daylis.insert(daylis);
    console.log(id);

  },
    'submit #todos-form':function(event){
    event.preventDefault();

    var text = $("input[name=texto1]").val();
    var exp = $("input[name=exp]").val();
    var gold = $("input[name=gold]").val();
    var dmge = $("input[name=DMG]").val();
    var todos = {
      text: text,
      exp: exp,
      gold: gold,
      dmge: dmge,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };

    var id = Todos.insert(todos);
    console.log(id);

  },
      'submit #rewards-form':function(event){
    event.preventDefault();

    var text = $("input[name=texto2]").val();
    var gold = $("input[name=gold]").val();
    var rewards = {
      text: text,
      gold: gold,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };

    var id = Rewards.insert(rewards);
    console.log(id);

  },
    'change .hide-completed input'(event, instance){
      instance.state.set('hideCompleted', event.target.checked);
  }

});
/*
Template.habit.events({
  'submit #habit-form': function(e){
    e.preventDefault();
    var text = $("input[name=text]").val();
    var exp = $("input[name=exp]").val();
    var gold = $("input[name=gold]").val();
    var DMG = $("input[name=DMG]").val();

    var tasks = {
      text: text,
      exp: exp,
      gold: gold,
      DMG: DMG
    };

    var id = Tasks.insert(tasks);

    console.log(id);


  }
});*/

