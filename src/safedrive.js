function startSafeDrive() {
    // CANVAS chosen, so 'debug' functions likde debug.body(sprite) can work...
    // change later maybe on Phaser.AUTO
    var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {
        game.load.spritesheet('phaser', 'assets/phaser.png', 100, 87);
        game.load.image('car01', 'assets/car01.png');
        game.load.image('car02', 'assets/car02.png');
        game.load.image('bus', 'assets/bus.png');
        game.load.image('scenebig', 'assets/scene_big.png');
        game.load.image('trigger', 'assets/trigger.png');
        game.load.image('trigger_big', 'assets/trigger_big.png');
        game.load.image('presenter', 'assets/presenter.png');
        game.load.image('pedestrian01', 'assets/pedestrian01.png');
        game.load.image('pedestrian02', 'assets/pedestrian02.png');
        game.load.image('pedestrian03', 'assets/pedestrian03.png');
        game.load.spritesheet('bike', 'assets/bike.png', 59, 45);
        game.load.image('ball', 'assets/shinyball.png');
        game.load.image('attention', 'assets/attention.png');
        game.load.image('blank_red', 'assets/blank_red.png');
        game.load.spritesheet('reload', 'assets/buttons/reload.png', 100, 100);
        game.load.spritesheet('button_pl', 'assets/buttons/pl.png', 100, 100);
        game.load.spritesheet('button_en', 'assets/buttons/en.png', 100, 100);

        game.load.spritesheet('button', 'assets/buttons/button_orange.png', 100, 100);
        game.load.image('button_border_normal', 'assets/buttons/orange_normal_border.png');
        game.load.image('button_border_pressed', 'assets/buttons/orange_pressed_border.png');

        game.load.spritesheet('stageButtons', 'assets/button-round.png', 64, 64);

        game.load.audio('sfx', 'assets/fx/fx_mixdown.mp3');
    }

    var roadObjectsFactory;
    var situationsManager;
    var backgroundManipulator;
    var fx;

    function create() {
        fx = game.add.audio('sfx');
        fx.allowMultiple = true;
        fx.addMarker('click1', 1.1, 0.25);
        fx.addMarker('click2', 2, 0.25);
        fx.addMarker('click3', 3, 0.25);

        backgroundManipulator = new BackgroundManipulator(game);
        roadObjectsFactory = new RoadObjectFactory(game);
        situationsManager = new SituationsManager(game, roadObjectsFactory,
            backgroundManipulator, fx);

        if (sConstants.SHOW_PHASER_LOGO) {
            var phaserButton = game.add.button(0, 0, 'phaser',
                function () {
                    window.open("http://phaser.io/");
                }, this,
                1, 0, 1, 0);
            phaserButton.scale.setTo(0.6, 0.6);
            phaserButton.position.setTo(0, 480 - phaserButton.height);
            phaserButton.setSounds(fx, 'click3', fx, 'click1');
        }
        if (sConstants.SHOW_AUTHOR) {
            var authorText = game.add.text(0, 480 - 20, 'adam@skobo.pl', {
                font: "15px Arial",
                fontWeight: 'bold',
                fill: '#ffffff'
            });
        }

    }

    function update() {
        roadObjectsFactory.callAll(RoadObject.prototype.updateText);
        situationsManager.update();
    }

    function render() {
        // debug all sprites in factory's roadObjectsGroup
        roadObjectsFactory.roadObjectsGroup.forEach(function (item) {
            if (sConstants.DEBUG) {
                game.debug.body(item);
            }
            // uncomment to debut sprite's name
            //                    game.debug.text(item.name, item.x, item.y);
        });
    }
}