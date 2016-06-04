// Template.events.onRendered({
//   $('#events-calendar').fullCalendar();
// });



//These events use a different process of invoking by placing the action at the end as a arrow method
Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe('events');
});

//Arrrow funciton es6
Template.calendar.onRendered( () =>{
  $('#events-calendar').fullCalendar({
    events(start, end, timezone, callback){
      let data = Events.find().fetch().map( (event)  => {
        event.editable = !isPast( event.start );
        return event;
      });

      if (data){
        callback(data);
      }
    },

    eventRender(event, element){
      element.find('.fc-content').html(
        `<h4>${ event.title }</h4>
        <p class="guest-count">${ event.guests } Guests</p>
        <p class="type-${ event.type }">#${ event.type}</p>
        `
      );
    },
    dayClick(date){
      Session.set('eventModal', {type: 'add', date: date.format()});
      $( '#add-edit-event-modal').modal('show');
    },
    eventClick(event){
      Session.set( 'eventModal', {type: 'edit', event: event._id});
      $( '#add-edit-event-modal').modal('show');
    }
  });

  Tracker.autorun( () => {
    Events.find().fetch();
    $( '#events-calendar').fullCalendar('refetchEvents')
  });
});
