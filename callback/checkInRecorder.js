var Conference = Conference || {};

Conference.checkInRecorder = function() {
  'use strict';

  var messages = {
    mustBeCheckedIn: '참가자는 체크인된 것으로 표시되어야 한다.',
    httpFailure: 'HTTP 요청 실패!'
  };

  return {
    getMessages() {
      return messages;
    },

    recordCheckIn(attendee) {
      return new Promise((resolve, reject) => {
        if (attendee.isCheckedIn()) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function onreadystatechange() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(xhr.reponseText);
              }
            }
          }
        } else {
          reject(new Error(messages.mustBeCheckedIn));
        }
      });
    }
  };
};