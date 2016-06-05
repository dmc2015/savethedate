let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

let closeModal = () => {
  $('#add-edit-event-modal').modal('hide');
  $('.modal-backdrop').fadeOut();
}

Template.addEditEventModal.events({
  'submit form' (event, template){

    event.preventDefault();

    let eventModal = Session.get('eventModal'),

    submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
    eventItem = {
      title: template.find('[name="title"]').value,
      start: template.find('[name="start"]').value,
      end: template.find('[name="end"]').value,
      type: template.find('[name="type"] option:selected').value,
      guests: parseInt(template.find('[name="guests"]').value, 10)
    };

    if(submitType === 'editEvent'){
      eventItem._id = eventModal.event;
    }

    Meteor.call(submitType, eventItem, (error) => {
      if(error){
        Bert.alert(error.reason, 'danger');
      } else{
        Bert.alert(`Event ${eventModal.type}ed!`, 'success');
        template.find('[name="title"]').value = "";
        template.find('[name="guests"]').value = "";
        template.find('[name="type"]').value = `Birthday`;
        closeModal();
      }
    });
  },

  'click .delete-event' ( event, template ){
    let eventModal = Session.get('eventModal');
    if( confirm('Are you sure? This is permanent.')){
      Meteor.call('removeEvent', eventModal.event, ( error ) =>{
        if ( error ){
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Event Deleted', 'success');
          closeModal();
        }
      });
    }
  }
});
