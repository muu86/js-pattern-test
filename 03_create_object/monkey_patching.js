var MyApp = MyApp || {};

MyApp.Hand = function () {
  this.dataAboutHand = {};
};
MyApp.Hand.prototype.arrangeAndMove = function (sign) {
  this.dataAboutHand = '새로운 수화 동작';
};

MyApp.Human = function (handFactory) {
  this.hands = [handFactory(), handFactory()];
};
MyApp.Human.prototype.useSignLanguage = function (message) {
  var sign = {};

  this.hands.forEach(hand => {
    hand.arrangeAndMove(sign);
  });
  return '손을 움직여 수화하고 있어. 무슨 말인지 알겠니?';
};

MyApp.Gorilla = function (handFactory) {
  this.hands = [handFactory(), handFactory()];
};

MyApp.TeachSignLanguageTokoko = (function () {
  var handFactory = function () {
    return new MyApp.Hand();
  };

  var trainer = new MyApp.Human(handFactory);
  var koko = new MyApp.Gorilla(handFactory);

  koko.useSignLanguage = trainer.useSignLanguage;

  console.log(koko.useSignLanguage('안녕하세요!'));
}());

