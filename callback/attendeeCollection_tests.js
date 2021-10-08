describe('Conference.attendeeCollection', function () {

  describe('contains(attendee)', function () {
  });

  describe('add(attendee)', function () {
  });

  describe('remove(attendee)', function () {
  });

  describe('iterate(callback)', function () {
    var collection, callbackSpy;

    function addAttendeesToCollection(attendeeArray) {
      attendeeArray.forEach(attendee => {
        collection.add(attendee);
      });
    }

    function verifyCallbackWasExcutedForEachAttendee(attendeeArray) {
      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

      var allCalls = callbackSpy.calls.all();
      for (var i = 0; i < allCalls.length; i++) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(function () {
      collection = Conference.attendeeCollection();
      callbackSpy = jasmine.createSpy();
    });

    it('빈 컬렉션에서는 콜백을 실행하지 않는다', function () {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다', function () {
      var attendees = [
        Conference.attendee('윤지', '김')
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExcutedForEachAttendee(attendees);
    });

    it('컬렉션 원소마다 한 번씩 콜백을 실행한다', function() {
      var attendees = [
        Conference.attendee('Tom', 'Kazansky'),
        Conference.attendee('Charlotte', 'Blackwood'),
        Conference.attendee('태영', '김')
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExcutedForEachAttendee(attendees);
    });
  });
})