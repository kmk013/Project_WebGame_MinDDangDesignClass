(function() {
  var game = new Light.Game('game', 1024, 768, '#004A7B', function (asset) {
    asset.loadImage('badend', 'image/badEnding.png');
    asset.loadImage('badgeh', 'image/badgeHaerang.png');
    asset.loadImage('badgerg', 'image/badgeRG.png');
    asset.loadImage('badgez', 'image/badgeZeropen.png');
    asset.loadImage('mrchan', 'image/chanwooham.png');
    asset.loadImage('exitbutton', 'image/exitButton.png');
    asset.loadImage('firstbg', 'image/firstBackground.png');
    asset.loadImage('mrgwang', 'image/gwangjoon.png');
    asset.loadImage('homebutton', 'image/homeButton.png');
    asset.loadImage('introbg', 'image/introBackground.png');
    asset.loadImage('logochanwooham', 'image/logoChanwooham.png');
    asset.loadImage('logogwang', 'image/logoGwangjoon.png');
    asset.loadImage('logohaerang', 'image/logoHaerang.png');
    asset.loadImage('logomingyu', 'image/logomingyu.png');
    asset.loadImage('logorg', 'image/logoRG.png');
    asset.loadImage('logoseobujang', 'image/logoSeobujang.png');
    asset.loadImage('logozeropen', 'image/logoZeropen.png');
    asset.loadImage('mrmingyu', 'image/mingyu.png');
    asset.loadImage('realend', 'image/realEnding.png');
    asset.loadImage('secondbg', 'image/secondBackground.png');
    asset.loadImage('mrseobujang', 'image/seobujang.png');
    asset.loadImage('barfour', 'image/shopBarFour.png');
    asset.loadImage('barthree', 'image/shopBarThree.png');
    asset.loadImage('shopbutton', 'image/shopButton.png');
    asset.loadImage('starbutton', 'image/starButton.png');
    asset.loadImage('thirdbg', 'image/thirdBackground.png');

    asset.loadAudio('one', 'sound/stageone.mp3');
    asset.loadAudio('two', 'sound/stagetwo.mp3');
    asset.loadAudio('three', 'sound/stagethree.mp3');
    asset.loadAudio('bed', 'sound/bedend.mp3');
    asset.loadAudio('real', 'sound/realend.mp3');
  });

  var introState = new Light.State(game);
  var firstState = new Light.State(game);
  var secondState = new Light.State(game);
  var thirdState = new Light.State(game);
  var badEndingState = new Light.State(game);
  var realEndingState = new Light.State(game);

  var stage = 'first';
  var gold = 0;
  var getGold = 5;

  var Mingyui = 0;
  var RGi = 0;
  var fClear = false;

  var Seobujangi = 0;
  var Haerangi = 0;
  var sClear = false;

  var Chanwoohami = 0;
  var cChanwooham = false;
  var Gwangjooni = 0;
  var cGwangjoon = false;
  var Zeropeni = 0;
  var tClear = false;
  var badEnding = false;
  var realEnding = false;

  var oneStage;
  var twoStage;
  var threeStage;
  var bedEnd;
  var realEnd;

  introState.onInit = function () {
    this.addChild(new Light.Sprite(game.asset.getImage('introbg')));

    this.infoText = new Light.TextField();
    this.infoText.font = '60px 궁서';
    this.infoText.fillStyle = '#000';
    this.infoText.position.set(325, 160);
    this.infoText.text = '클릭하면 시작!';
    this.addChild(this.infoText);
  };
  introState.onUpdate = function () {
    if(game.input.mouse.isJustPressed(Light.Mouse.LEFT))
      game.states.change(stage);
  };

  firstState.onInit = function () {
    oneStage = game.asset.getAudio('one');
    oneStage.currentTime = 0;
    oneStage.volume = 1;
    oneStage.play();

    this.mingyu = [];
    this.mingyu[0] = new Light.Sprite(game.asset.getImage('mrmingyu'));
    this.mingyu[0].position.set(250, 10);
    this.mingyu[1] = new Light.Sprite(game.asset.getImage('mrmingyu'));
    this.mingyu[1].position.set(350, 10);

    this.badgeRG = new Light.Sprite(game.asset.getImage('badgerg'));
    this.badgeRG.position.set(810, 124);

    this.firstBg = new Light.Sprite(game.asset.getImage('firstbg'));

    this.shopBarThree = new Light.Sprite(game.asset.getImage('barthree'));
    this.shopBarThree.position.set(0, 672);

    this.logoMingyu = new Light.Sprite(game.asset.getImage('logomingyu'));
    this.logoMingyu.position.set(8, 680);
    this.logoRG = new Light.Sprite(game.asset.getImage('logorg'));
    this.logoRG.position.set(349, 680);
    this.starButton = new Light.Sprite(game.asset.getImage('starbutton'));
    this.starButton.position.set(690, 680);

    this.homeButton = new Light.Sprite(game.asset.getImage('homebutton'));
    this.homeButton.position.set(910, 14);

    this.mingyuText = [];
    this.logoRGText = [];
    this.fstarText = [];

    this.addChild(this.firstBg);
    this.addChild(this.shopBarThree);
    this.addChild(this.logoMingyu);
    this.addChild(this.logoRG);
    this.addChild(this.starButton);
    if(Mingyui == 1)
      this.addChild(this.mingyu[0]);
    else if(Mingyui == 2) {
      this.addChild(this.mingyu[0]);
      this.addChild(this.mingyu[1]);
    }
    if(RGi == 1)
      this.addChild(this.badgeRG);
    this.addChild(this.homeButton);

    this.goldText = new Light.TextField();
    this.goldText.font = '30px 궁서';
    this.goldText.fillStyle = '#000';
    this.goldText.position.set(10, 10);
    this.goldText.text = '골드 : ' + gold;
    this.addChild(this.goldText);

    this.mingyuText[0] = new Light.TextField();
    this.mingyuText[0].font = '20px 궁서';
    this.mingyuText[0].fillStyle = '#000';
    this.mingyuText[0].position.set(110, 680);
    this.mingyuText[0].text = '가격 : 500G';
    this.mingyuText[1] = new Light.TextField();
    this.mingyuText[1].font = '20px 궁서';
    this.mingyuText[1].fillStyle = '#000';
    this.mingyuText[1].position.set(110, 710);
    this.mingyuText[1].text = '구입가능 횟수 : ' + (2 - Mingyui);
    this.mingyuText[2] = new Light.TextField();
    this.mingyuText[2].font = '20px 궁서';
    this.mingyuText[2].fillStyle = '#000';
    this.mingyuText[2].position.set(110, 740);
    this.mingyuText[2].text = '골드를 +10원씩 더 번다.';
    this.addChild(this.mingyuText[0]);
    this.addChild(this.mingyuText[1]);
    this.addChild(this.mingyuText[2]);

    this.logoRGText[0] = new Light.TextField();
    this.logoRGText[0].font = '20px 궁서';
    this.logoRGText[0].fillStyle = '#000';
    this.logoRGText[0].position.set(451, 690);
    this.logoRGText[0].text = '가격 : 7500G';
    this.logoRGText[1] = new Light.TextField();
    this.logoRGText[1].font = '20px 궁서';
    this.logoRGText[1].fillStyle = '#000';
    this.logoRGText[1].position.set(451, 720);
    this.logoRGText[1].text = '구입가능 횟수 : ' + (1 - RGi);
    this.addChild(this.logoRGText[0]);
    this.addChild(this.logoRGText[1]);

    this.fstarText[0] = new Light.TextField();
    this.fstarText[0].font = '20px 궁서';
    this.fstarText[0].fillStyle = '#000';
    this.fstarText[0].position.set(792, 690);
    this.fstarText[0].text = '다음 단계로 넘어간다.';
    this.fstarText[1] = new Light.TextField();
    this.fstarText[1].font = '20px 궁서';
    this.fstarText[1].fillStyle = '#000';
    this.fstarText[1].position.set(792, 720);
    this.fstarText[1].text = '조건 : 뱃지사기';
    this.addChild(this.fstarText[0]);
    this.addChild(this.fstarText[1]);
  }
  firstState.onUpdate = function () {
    var localMousePos = game.camera.screenToLocal(game.input.mouse.position);
    var isMousePressed = game.input.mouse.isJustPressed(Light.Mouse.LEFT);

    if(isMousePressed)
      gold += getGold;

    if (isMousePressed && localMousePos.x > 910 && localMousePos.y > 14 && localMousePos.x < 1010 && localMousePos.y < 114)
      game.states.change('intro');

    if (isMousePressed && gold >= 500 && Mingyui < 2 && localMousePos.x > 0 && localMousePos.y > 672 && localMousePos.x < 341 && localMousePos.y < 768)
    {
      gold -= 500;
      getGold += 10;
      this.addChild(this.mingyu[Mingyui]);
      Mingyui++;
    }

    if (isMousePressed && gold >= 7500 && RGi < 1 && localMousePos.x > 341 && localMousePos.y > 672 && localMousePos.x < 682 && localMousePos.y < 768)
    {
      gold -= 7500;
      this.addChild(this.badgeRG);
      fClear = true;
      RGi++;
    }

    if(isMousePressed && localMousePos.x > 682 && localMousePos.y > 672 && localMousePos.x < 1024 && localMousePos.y < 768)
    {
      stage = 'second';
      game.states.change('second');
      oneStage.pause();
    }

    this.mingyuText[1].text = '구입가능 횟수 : ' + (2 - Mingyui);
    this.logoRGText[1].text = '구입가능 횟수 : ' + (1 - RGi);
    this.goldText.text = '골드 : ' + gold;
  }

  secondState.onInit = function () {
    twoStage = game.asset.getAudio('two');
    twoStage.currentTime = 0;
    twoStage.volume = 1;
    twoStage.play();

    this.mingyu = [];
    this.mingyu[0] = new Light.Sprite(game.asset.getImage('mrmingyu'));
    this.mingyu[0].position.set(150, 10);
    this.mingyu[1] = new Light.Sprite(game.asset.getImage('mrmingyu'));
    this.mingyu[1].position.set(250, 10);
    this.seobujang = new Light.Sprite(game.asset.getImage('mrseobujang'));
    this.seobujang.position.set(450, 10);

    this.badgeRG = new Light.Sprite(game.asset.getImage('badgerg'));
    this.badgeRG.position.set(810, 200);
    this.badgeHaerang = new Light.Sprite(game.asset.getImage('badgeh'));
    this.badgeHaerang.position.set(810, 225);

    this.secondBg = new Light.Sprite(game.asset.getImage('secondbg'));

    this.shopBarThree = new Light.Sprite(game.asset.getImage('barthree'));
    this.shopBarThree.position.set(0, 672);

    this.logoSeobujang = new Light.Sprite(game.asset.getImage('logoseobujang'));
    this.logoSeobujang.position.set(8, 680);
    this.logoHaerang = new Light.Sprite(game.asset.getImage('logohaerang'));
    this.logoHaerang.position.set(349, 680);
    this.starButton = new Light.Sprite(game.asset.getImage('starbutton'));
    this.starButton.position.set(690, 680);

    this.homeButton = new Light.Sprite(game.asset.getImage('homebutton'));
    this.homeButton.position.set(875, 14);

    this.seobujangText = [];
    this.logoHaerangText = [];
    this.sStarText = [];

    this.addChild(this.secondBg);
    this.addChild(this.shopBarThree);
    this.addChild(this.logoSeobujang);
    this.addChild(this.logoHaerang);
    this.addChild(this.starButton);
    this.addChild(this.homeButton);
    if(Mingyui == 1)
      this.addChild(this.mingyu[0]);
    else if(Mingyui == 2)
    {
      this.addChild(this.mingyu[0]);
      this.addChild(this.mingyu[1]);
    }
    this.addChild(this.badgeRG);

    this.goldText = new Light.TextField();
    this.goldText.font = '30px 궁서';
    this.goldText.fillStyle = '#000';
    this.goldText.position.set(10, 10);
    this.goldText.text = '골드 : ' + gold;
    this.addChild(this.goldText);

    this.seobujangText[0] = new Light.TextField();
    this.seobujangText[0].font = '20px 궁서';
    this.seobujangText[0].fillStyle = '#000';
    this.seobujangText[0].position.set(110, 680);
    this.seobujangText[0].text = '가격 : 10000G';
    this.seobujangText[1] = new Light.TextField();
    this.seobujangText[1].font = '20px 궁서';
    this.seobujangText[1].fillStyle = '#000';
    this.seobujangText[1].position.set(110, 710);
    this.seobujangText[1].text = '구입가능 횟수 : ' + (1 - Seobujangi);
    this.seobujangText[2] = new Light.TextField();
    this.seobujangText[2].font = '20px 궁서';
    this.seobujangText[2].fillStyle = '#000';
    this.seobujangText[2].position.set(110, 740);
    this.seobujangText[2].text = '골드를 +50원씩 더 번다.';
    this.addChild(this.seobujangText[0]);
    this.addChild(this.seobujangText[1]);
    this.addChild(this.seobujangText[2]);

    this.logoHaerangText[0] = new Light.TextField();
    this.logoHaerangText[0].font = '20px 궁서';
    this.logoHaerangText[0].fillStyle = '#000';
    this.logoHaerangText[0].position.set(451, 690);
    this.logoHaerangText[0].text = '가격 : 37500G';
    this.logoHaerangText[1] = new Light.TextField();
    this.logoHaerangText[1].font = '20px 궁서';
    this.logoHaerangText[1].fillStyle = '#000';
    this.logoHaerangText[1].position.set(451, 720);
    this.logoHaerangText[1].text = '구입가능 횟수 : ' + (1 - Haerangi);
    this.addChild(this.logoHaerangText[0]);
    this.addChild(this.logoHaerangText[1]);

    this.sStarText[0] = new Light.TextField();
    this.sStarText[0].font = '20px 궁서';
    this.sStarText[0].fillStyle = '#000';
    this.sStarText[0].position.set(792, 690);
    this.sStarText[0].text = '다음 단계로 넘어간다.';
    this.sStarText[1] = new Light.TextField();
    this.sStarText[1].font = '20px 궁서';
    this.sStarText[1].fillStyle = '#000';
    this.sStarText[1].position.set(792, 720);
    this.sStarText[1].text = '조건 : 뱃지사기';
    this.addChild(this.sStarText[0]);
    this.addChild(this.sStarText[1]);
  }
  secondState.onUpdate = function () {
    var localMousePos = game.camera.screenToLocal(game.input.mouse.position);
    var isMousePressed = game.input.mouse.isJustPressed(Light.Mouse.LEFT);

    if(isMousePressed)
      gold += getGold;

    if (isMousePressed && localMousePos.x > 910 && localMousePos.y > 14 && localMousePos.x < 1010 && localMousePos.y < 114)
      game.states.change('intro');

    if (isMousePressed && gold >= 10000 && Seobujangi < 1 && localMousePos.x > 0 && localMousePos.y > 672 && localMousePos.x < 341 && localMousePos.y < 768)
    {
      gold -= 10000;
      getGold += 50;
      this.addChild(this.seobujang);
      Seobujangi++;
    }

    if (isMousePressed && gold >= 37500 && Haerangi < 1 && localMousePos.x > 341 && localMousePos.y > 672 && localMousePos.x < 682 && localMousePos.y < 768)
    {
      gold -= 37500;
      this.addChild(this.badgeHaerang);
      sClear = true;
      Haerangi++;
    }

    if(isMousePressed && localMousePos.x > 682 && localMousePos.y > 672 && localMousePos.x < 1024 && localMousePos.y < 768)
    {
      stage = 'third';
      game.states.change('third');
      twoStage.pause();
    }

    this.seobujangText[1].text = '구입가능 횟수 : ' + (1 - Seobujangi);
    this.logoHaerangText[1].text = '구입가능 횟수 : ' + (1 - Haerangi);
    this.goldText.text = '골드 : ' + gold;
  }

  thirdState.onInit = function () {
    threeStage = game.asset.getAudio('three');
    threeStage.currentTime = 0;
    threeStage.volume = 1;
    threeStage.play();

    this.mingyu = [];
    this.mingyu[0] = new Light.Sprite(game.asset.getImage('mrmingyu'));
    this.mingyu[0].position.set(150, 10);
    this.mingyu[1] = new Light.Sprite(game.asset.getImage('mrmingyu'));
    this.mingyu[1].position.set(250, 10);
    this.seobujang = new Light.Sprite(game.asset.getImage('mrseobujang'));
    this.seobujang.position.set(350, 10);
    this.chanwooham = new Light.Sprite(game.asset.getImage('mrchan'));
    this.chanwooham.position.set(450, 10);
    this.gwangjoon = new Light.Sprite(game.asset.getImage('mrgwang'));
    this.gwangjoon.position.set(450, 10);

    this.badgeRG = new Light.Sprite(game.asset.getImage('badgerg'));
    this.badgeRG.position.set(10, 462);
    this.badgeHaerang = new Light.Sprite(game.asset.getImage('badgeh'));
    this.badgeHaerang.position.set(110, 462);
    this.badgeZeropen = new Light.Sprite(game.asset.getImage('badgez'));
    this.badgeZeropen.position.set(210, 462);

    this.thirdBg = new Light.Sprite(game.asset.getImage('thirdbg'));

    this.shopBarFour = new Light.Sprite(game.asset.getImage('barfour'));
    this.shopBarFour.position.set(0, 672);

    this.logoChanwooham = new Light.Sprite(game.asset.getImage('logochanwooham'));
    this.logoChanwooham.position.set(8, 680);
    this.logoGwangjoon = new Light.Sprite(game.asset.getImage('logogwang'));
    this.logoGwangjoon.position.set(264, 680);
    this.logoZeropen = new Light.Sprite(game.asset.getImage('logozeropen'));
    this.logoZeropen.position.set(520, 680);
    this.starButton = new Light.Sprite(game.asset.getImage('starbutton'));
    this.starButton.position.set(776, 680);

    this.homeButton = new Light.Sprite(game.asset.getImage('homebutton'));
    this.homeButton.position.set(910, 14);

    this.chanwoohamText = [];
    this.gwangjoonText = [];
    this.logoZeropenText = [];
    this.tStarText = [];

    this.addChild(this.thirdBg);
    this.addChild(this.shopBarFour);
    this.addChild(this.logoChanwooham);
    this.addChild(this.logoGwangjoon);
    this.addChild(this.logoZeropen);
    this.addChild(this.starButton);
    this.addChild(this.homeButton);
    if(Mingyui == 1)
      this.addChild(this.mingyu[0]);
    else if(Mingyui == 2)
    {
      this.addChild(this.mingyu[0]);
      this.addChild(this.mingyu[1]);
    }

    if(Seobujangi == 1)
    {
      this.addChild(this.seobujang);
    }
    this.addChild(this.badgeRG);
    this.addChild(this.badgeHaerang);

    this.goldText = new Light.TextField();
    this.goldText.font = '30px 궁서';
    this.goldText.fillStyle = '#000';
    this.goldText.position.set(10, 10);
    this.goldText.text = '골드 : ' + gold;
    this.addChild(this.goldText);

    this.chanwoohamText[0] = new Light.TextField();
    this.chanwoohamText[0].font = '20px 궁서';
    this.chanwoohamText[0].fillStyle = '#000';
    this.chanwoohamText[0].position.set(75, 680);
    this.chanwoohamText[0].text = '가격 : 30000G';
    this.chanwoohamText[1] = new Light.TextField();
    this.chanwoohamText[1].font = '20px 궁서';
    this.chanwoohamText[1].fillStyle = '#000';
    this.chanwoohamText[1].position.set(75, 710);
    this.chanwoohamText[1].text = '구입가능 횟수 : ' + (1 - Chanwoohami);
    this.chanwoohamText[2] = new Light.TextField();
    this.chanwoohamText[2].font = '20px 궁서';
    this.chanwoohamText[2].fillStyle = '#000';
    this.chanwoohamText[2].position.set(75, 740);
    this.chanwoohamText[2].text = '골드를 +98원씩 더 번다.';
    this.addChild(this.chanwoohamText[0]);
    this.addChild(this.chanwoohamText[1]);
    this.addChild(this.chanwoohamText[2]);

    this.gwangjoonText[0] = new Light.TextField();
    this.gwangjoonText[0].font = '20px 궁서';
    this.gwangjoonText[0].fillStyle = '#000';
    this.gwangjoonText[0].position.set(331, 680);
    this.gwangjoonText[0].text = '가격 : 30000G';
    this.gwangjoonText[1] = new Light.TextField();
    this.gwangjoonText[1].font = '20px 궁서';
    this.gwangjoonText[1].fillStyle = '#000';
    this.gwangjoonText[1].position.set(331, 710);
    this.gwangjoonText[1].text = '구입가능 횟수 : ' + (1 - Gwangjooni);
    this.gwangjoonText[2] = new Light.TextField();
    this.gwangjoonText[2].font = '20px 궁서';
    this.gwangjoonText[2].fillStyle = '#000';
    this.gwangjoonText[2].position.set(331, 740);
    this.gwangjoonText[2].text = '골드를 +70원씩 더 번다.';
    this.addChild(this.gwangjoonText[0]);
    this.addChild(this.gwangjoonText[1]);
    this.addChild(this.gwangjoonText[2]);

    this.logoZeropenText[0] = new Light.TextField();
    this.logoZeropenText[0].font = '20px 궁서';
    this.logoZeropenText[0].fillStyle = '#000';
    this.logoZeropenText[0].position.set(600, 690);
    this.logoZeropenText[0].text = '가격 : 120000G';
    this.logoZeropenText[1] = new Light.TextField();
    this.logoZeropenText[1].font = '20px 궁서';
    this.logoZeropenText[1].fillStyle = '#000';
    this.logoZeropenText[1].position.set(600, 720);
    this.logoZeropenText[1].text = '구입가능 횟수 : ' + (1 - Haerangi);
    this.addChild(this.logoZeropenText[0]);
    this.addChild(this.logoZeropenText[1]);

    this.tStarText[0] = new Light.TextField();
    this.tStarText[0].font = '20px 궁서';
    this.tStarText[0].fillStyle = '#000';
    this.tStarText[0].position.set(856, 680);
    this.tStarText[0].text = '엔딩을 본다.';
    this.tStarText[1] = new Light.TextField();
    this.tStarText[1].font = '20px 궁서';
    this.tStarText[1].fillStyle = '#000';
    this.tStarText[1].position.set(830, 710);
    this.tStarText[1].text = '조건 : 캐릭터 1개사기';
    this.tStarText[2] = new Light.TextField();
    this.tStarText[2].font = '20px 궁서';
    this.tStarText[2].fillStyle = '#000';
    this.tStarText[2].position.set(900, 740);
    this.tStarText[2].text = '뱃지사기';
    this.addChild(this.tStarText[0]);
    this.addChild(this.tStarText[1]);
    this.addChild(this.tStarText[2]);
  }
  thirdState.onUpdate = function () {
    var localMousePos = game.camera.screenToLocal(game.input.mouse.position);
    var isMousePressed = game.input.mouse.isJustPressed(Light.Mouse.LEFT);

    if(isMousePressed)
      gold += getGold;

    if (isMousePressed && localMousePos.x > 910 && localMousePos.y > 14 && localMousePos.x < 1010 && localMousePos.y < 114)
      game.states.change('intro');

    if (isMousePressed && gold >= 30000 && Chanwoohami < 1 && localMousePos.x > 0 && localMousePos.y > 672 && localMousePos.x < 256 && localMousePos.y < 768)
    {
      gold -= 30000;
      getGold += 98;
      this.addChild(this.chanwooham);
      Chanwoohami++;
      Gwangjooni++;
      cChanwooham = true;
    }

    if (isMousePressed && gold >= 30000 && Gwangjooni < 1 && localMousePos.x > 256 && localMousePos.y > 672 && localMousePos.x < 512 && localMousePos.y < 768)
    {
      gold -= 30000;
      getGold += 70;
      this.addChild(this.gwangjoon);
      Chanwoohami++;
      Gwangjooni++;
      cGwangjoon = true;
    }

    if(isMousePressed && gold >= 120000 && localMousePos.x > 512 && localMousePos.y > 672 && localMousePos.x < 768 && localMousePos.y < 768)
    {
      gold -= 120000;
      this.addChild(this.badgeZeropen);
      tClear = true;
    }

    if(isMousePressed && tClear == true &&localMousePos.x > 768 && localMousePos.y > 672 && localMousePos.x < 1024 && localMousePos.y < 768)
    {
      if(cChanwooham == true)
      {
        game.states.change('badending');
        threeStage.pause();
      }
      else if(cGwangjoon == true)
      {
        game.states.change('realending');
        threeStage.pause();
      }
    }

    this.chanwoohamText[1].text = '구입가능 횟수 : ' + (1 - Chanwoohami);
    this.gwangjoonText[1].text = '구입가능 횟수 : ' + (1 - Gwangjooni);
    this.logoZeropenText[1].text = '구입가능 횟수 : ' + (1 - Zeropeni);
    this.goldText.text = 'GOLD : ' + gold;
  }

  badEndingState.onInit = function () {
    bedEnd = game.asset.getAudio('bed');
    bedEnd.currentTime = 0;
    bedEnd.volume = 1;
    bedEnd.play();

    this.badEndingBg = new Light.Sprite(game.asset.getImage('badend'));
    this.addChild(this.badEndingBg);

    this.restartText = new Light.TextField();
    this.restartText.font = '60px 궁서';
    this.restartText.fillStyle = '#000';
    this.restartText.position.set(325, 160);
    this.restartText.text = '클릭하면 종료!';
    this.addChild(this.restartText);
  }
  badEndingState.onUpdate = function () {
    var isMousePressed = game.input.mouse.isJustPressed(Light.Mouse.LEFT);

    if(isMousePressed)
    {
      bedEnd.pause();
      window.close();
    }
  }

  realEndingState.onInit = function () {
    realEnd = game.asset.getAudio('real');
    realEnd.currentTime = 0;
    realEnd.volume = 1;
    realEnd.play();

    this.realEndingBg = new Light.Sprite(game.asset.getImage('realend'));
    this.addChild(this.realEndingBg);

    this.restartText = new Light.TextField();
    this.restartText.font = '60px 궁서';
    this.restartText.fillStyle = '#000';
    this.restartText.position.set(325, 200);
    this.restartText.text = '클릭하면 종료!';
    this.addChild(this.restartText);
  }
  realEndingState.onUpdate = function () {
    var isMousePressed = game.input.mouse.isJustPressed(Light.Mouse.LEFT);

    if(isMousePressed)
    {
      realEnd.pause();
      window.close();
    }
  }

  game.states.add('intro', introState);
  game.states.add('first', firstState);
  game.states.add('second', secondState);
  game.states.add('third', thirdState);
  game.states.add('badending', badEndingState);
  game.states.add('realending', realEndingState);

  game.states.change('intro');
}());
