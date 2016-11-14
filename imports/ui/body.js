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
  //Esta funcion guarda las tareas de tasks
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Tasks.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Tasks.find({}, {sort:{createdAt: -1}});
  },  
  //Esta funcion guarda las tareas de dailies
  daylis() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Daylis.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Daylis.find({}, {sort:{createdAt: -1}});
  },
  //Esta funcion guarda las tareas de todos
    todos() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Todos.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Todos.find({}, {sort:{createdAt: -1}});
  },
  //Esta funcion guarda las tareas de rewards
  rewards() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      return Rewards.find({checked: { $ne : true} }, {sort: {createdAt:-1} });
    }
    return Rewards.find({}, {sort:{createdAt: -1}});
  },
  //Contadores de tareas incompletas
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
//Obtenemos los datos desde el formulario y los almacenamos en variables locales de la funcion: *1*
    var s_habit_text = $("input[name=s_habit_text]").val();
    var i_habit_exp = $("input[name=i_habit_exp]").val();
    var i_habit_gold = $("input[name=i_habit_gold]").val();
    var i_habit_dmge = $("input[name=i_habit_DMG]").val();
//Se asignan los valores obtenidos como valores en una variable objeto *2*
    var tasks = {
      s_habit_text: s_habit_text,
      i_habit_exp: i_habit_exp,
      i_habit_gold: i_habit_gold,
      i_habit_dmge: i_habit_dmge,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };
//Se inserta en nuestra coleccion Tasks el objeto recien creado *3*
    var id = Tasks.insert(tasks);
    //Log de comprobacion de insercion *4*
    console.log(id);

  },
  'submit #dayli-form':function(event){
    event.preventDefault();
// *1*
    var text = $("input[name=texto]").val();
    var exp = $("input[name=exp]").val();
    var gold = $("input[name=gold]").val();
    var dmge = $("input[name=DMG]").val();
// *2*
    var daylis = {
      text: text,
      exp: exp,
      gold: gold,
      dmge: dmge,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };
// *3*
    var id = Daylis.insert(daylis);
    //*4*
    console.log(id);

  },
    'submit #todos-form':function(event){
    event.preventDefault();
//*1*
    var text = $("input[name=texto1]").val();
    var exp = $("input[name=exp1]").val();
    var gold = $("input[name=gold1]").val();
    var dmge = $("input[name=DMG1]").val();
// *2*
    var todos = {
      text: text,
      exp: exp,
      gold: gold,
      dmge: dmge,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };
//*3*
    var id = Todos.insert(todos);
    //*4*
    console.log(id);

  },
      'submit #rewards-form':function(event){
    event.preventDefault();
//*1*
    var text = $("input[name=texto2]").val();
    var i_reward_gold = $("input[name=i_reward_gold]").val();
//*2*
    var rewards = {
      text: text,
      i_reward_gold: i_reward_gold,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };
//*3*
    var id = Rewards.insert(rewards);
    //*4*
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

