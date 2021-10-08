var Conference = Conference || {};

Conference.attendeeCollection = function() {
  var attendees = [];

  return {
    contains(attendee) {
      return attendees.indexOf(attendee) > -1;
    },
    
    add(attendee) {
      if (!this.contains(attendee))
        attendees.push(attendee);
    },

    remove(attendee) {
      var index = attendees.indexOf(attendee);
      if (index > -1) {
        attendees.slice(index, 1);
      }
    },

    getCount() {
      return attendees.length;
    },

    iterate(callback) {
      attendees.forEach(callback);
    }
  };
};