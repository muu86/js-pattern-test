var Conference = Conference || {};

Conference.attendee = function(firstName, lastName) {
  'use strict';

  var checkedIn = false,
      first     = firstName || 'None',
      last      = lastName  || 'None',
      checkInNumber;

  return {
    getFullName() {
      return first + ' ' + last;
    },

    isCheckedIn() {
      return checkedIn;
    },

    checkIn() {
      checkedIn = true;
    },

    setCheckInNumber(number) {
      checkInNumber = number;
    },

    undoCheckIn() {
      checkedIn = false;
      checkInNumber = undefined;
    },

    getCheckInNumber() {
      return checkInNumber;
    }
  };
};