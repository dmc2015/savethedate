Template.addEditEventModal.helpers({
  modalType(type) {
    let eventModal = Session.get('eventModal');
    if (eventModal){
      return eventModal.type === type;
    }
  },

  modalLabel(){
    let eventModal = Session.get('eventModal');

    if(eventModal){
      return{
        button: eventModal.type === 'edit' ? 'Edit' : 'Add',
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  selected(v1,v2){
    return v1 === v2;
  },
  event(){
    let eventModal = Session.get('eventModal');

    if (eventModal){
      return eventModal.type === 'edit' ? Events.findOne(eventModal.event) : {
        start: eventModal.date
        end: eventModal.date
      };
    }
  }
});
