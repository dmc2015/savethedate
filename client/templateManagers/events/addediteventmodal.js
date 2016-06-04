Template.addEditEventModal.events({
  'submit form' (event, template){

    event.preventDefault();

    let eventModal = Session.get('eventModal'),

    submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
    eventItem = {
      title: template.find('[name="title"]').value,
      start: template.find('[name="start"]').value,
      end: template.find('[name="end"]').value,
      type: template.find('[name="type"] option:seleted').value,
      guests: parseInt(template.find('[name="guests"]').value, 10)
    };

    if(submitType === 'editEvent'){
      eventItem._id = eventModal.event;
    }

    Meteor.call(submitType, eventItem, (error) => {
      if(error){
        Bert.alert(error.reason, 'danger');
      } else{
        Bert.alert('Event ${eventModal.type}ed!', 'success');
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
