import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

// let closeModal() =>

// closeModal(){
//   $('#add-edit-event-modal').modal('hide');
//   $('.modal-backdrop').fadeOut();
// };

let closeModal = () => {
  $('#add-edit-event-modal').modal('hide');
  $('.modal-backdrop').fadeOut();
};


// let closeModal(){
//   $('#add-edit-event-modal').modal('hide');
//   $('.modal-backdrop').fadeOut();
// };
