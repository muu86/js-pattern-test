var Conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  var recorder = checkInRecorder;

  return {
    checkIn(attendee) {
      attendee.checkIn();
      return recorder.recordCheckIn(attendee).then(
        function onRecordCheckInSucceeded(checkInNumber) {
          attendee.setCheckInNumber(checkInNumber);
          return Promise.resolve(checkInNumber);
        },
        function onRecordCheckInFailed(reason) {
          attendee.undoCheckIn();
          return Promise.reject(reason);
        }
      );
    }
  };
};