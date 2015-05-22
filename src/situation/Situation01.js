function Situation01() {}

Situation01.prototype.sector = {
    x: 1,
    y: 0
};

Situation01.prototype.title = {
    pl: ["Bezpieczeństwo", "pieszego."],
    en: ["Pedestrian's", "safety."]
};

Situation01.prototype.collisions = [
    [sConstants.TRIGGER_S01_PEDESTRIAN, sConstants.OBJECT_PEDESTRIAN],
    [sConstants.TRIGGER_S01_END, sConstants.OBJECT_PEDESTRIAN],
    [sConstants.TRIGGER_S02_CARA_BRAKE, sConstants.OBJECT_CAR_A],
    [sConstants.OBJECT_PEDESTRIAN, sConstants.OBJECT_CAR_A],
    [sConstants.OBJECT_PEDESTRIAN, sConstants.OBJECT_CAR_B],
    [sConstants.TRIGGER_S02_CARA_BRAKE, sConstants.OBJECT_CAR_A],
    [sConstants.TRIGGER_S02_CARA_BRAKE, sConstants.OBJECT_CAR_B],
    [sConstants.TRIGGER_S02_CARA_STOP, sConstants.OBJECT_CAR_A],
    [sConstants.OBJECT_CAR_B, sConstants.OBJECT_PEDESTRIAN],
    [sConstants.TRIGGER_S03_CARB_BRAKE, sConstants.OBJECT_CAR_B],
    [sConstants.TRIGGER_S07_CARB_BRAKE, sConstants.OBJECT_CAR_B],
    [sConstants.TRIGGER_S07_CARB_STOP, sConstants.OBJECT_CAR_B],
    [sConstants.TRIGGER_S07_PEDESTRIAN_CHECK, sConstants.OBJECT_PEDESTRIAN],
    [sConstants.TRIGGER_S08_PEDESTRIAN_FINISH, sConstants.OBJECT_PEDESTRIAN]
];

Situation01.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "pedestrian01",
        "name": sConstants.OBJECT_PEDESTRIAN,
        "posX": 700,
        "posY": 135,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": sConstants.OBJECT_CAR_A,
        "posX": 530,
        "posY": 550,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": sConstants.OBJECT_CAR_B,
        "posX": 468,
        "posY": 1300,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S01_PEDESTRIAN,
        "posX": 610,
        "posY": 136,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S01_END,
        "posX": 580,
        "posY": 136,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S02_CARA_BRAKE,
        "posX": 530,
        "posY": 420,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S02_CARA_STOP,
        "posX": 535,
        "posY": 222,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S03_CARB_BRAKE,
        "posX": 480,
        "posY": 270,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S07_CARB_BRAKE,
        "posX": 480,
        "posY": 420,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S07_PEDESTRIAN_CHECK,
        "posX": 500,
        "posY": 136,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S07_CARB_STOP,
        "posX": 470,
        "posY": 221,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S08_PEDESTRIAN_FINISH,
        "posX": 350,
        "posY": 136,
        "angle": -90
    }
];

Situation01.prototype.instructionTexts = {
    bad: {
        name: "situationIntroducion",
        text: {
            pl: [
        "Opis sytuacji.",
        "Opis sytuacji.",
        "Opis sytuacji."],
            en: []
        }
    },
    good: {
        name: "goodIntroduction",
        text: {
            pl: [
                "Z braku rozwagi dochodzi do tragedii.",
                "Jak powinna wyglądać prawidłowa",
                "sytuacja?"],
            en: []
        }
    }
};