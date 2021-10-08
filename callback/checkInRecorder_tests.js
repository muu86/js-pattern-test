describe('Conference.checkInRecorder', function() {
  'use strict';

  var attendee, checkInRecorder;

  beforeEach(function() {
    attendee = Conference.attendee('엠제이', '킴');
    attendee.setId(777);
    checkInRecorder = Conference.checkInRecorder();

    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  })

  describe('recordCheckIn(attendee)', function() {

    it('HTTP 요청이 성공하여 참가자가 체크인되면 checkInNumber로 귀결된 프라미스를 반환한다', function() {
      var expectedCheckInNumber = 1234,
          request;
      attendee.checkIn();

      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved(actualCheckInNumber) {
          expect(typeof actualCheckInNumber).toBe('number');
        },
        function promiseRejected() {
          expect('프라미스는 버려졌다').toBe(false);
        }
      );

      request = jasmine.Ajax.requests.mostRecent();

      expect(request.url).toBe('/checkIn/' + attendee.getId());

      request.response({
        "status": 200,
        "contentType": "text/plane",
        "responseText": expectedCheckInNumber
      });
    });

    it('참가자가 체크인되지 않으면 에러와 버림 프라미스를 반환한다', function(done) {
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved() {
          expect('프라미스는 귀결됐다').toBe(false);
          done();
        },
        function promiseRejected(reason) {
          expect(reason instanceof Error).toBe(true);
          expect(reason.message).toBe(checkInRecorder.getMessages().mustBeCheckedIn);
          done();
        }
      );
    });

  });

});