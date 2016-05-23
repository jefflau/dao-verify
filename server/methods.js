import Todos from '../imports/collections';
import { checkDAOAccountExists } from './blockchain';

Meteor.methods({
  submitVerifyForm(form) {
    let tokens = checkDAOAccountExists(form.daoTokenAccount.value);
    console.log(tokens);
    if(tokens){
      return tokens + " tokens found"
    } else {
      return "no tokens found"
    }
  },
  addTodo(text) {
    return Todos.insert({text, completed: false})
  },
  toggleTodo(id) {
    let todo = Todos.findOne({_id: id}, {fields: { completed: true}});
    let completed = todo.completed;
    return Todos.update({_id: id}, {$set: {completed: !completed}});
  }
})
