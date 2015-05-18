function Situation01() {}

Situation01.prototype.sector = {
    x: 0,
    y: 2
};

Situation01.prototype.title = ["Wymijanie na przejściu", "dla pieszych"];

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
        "sprite": "pedestrian",
        "name": sConstants.OBJECT_PEDESTRIAN,
        "posX": 700,
        "posY": 110,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": sConstants.OBJECT_CAR_A,
        "posX": 405,
        "posY": 900,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": sConstants.OBJECT_CAR_B,
        "posX": 343,
        "posY": 1200,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S01_PEDESTRIAN,
        "posX": 560,
        "posY": 111,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S01_END,
        "posX": 500,
        "posY": 111,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S02_CARA_BRAKE,
        "posX": 395,
        "posY": 420,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S02_CARA_STOP,
        "posX": 390,
        "posY": 170,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S03_CARB_BRAKE,
        "posX": 340,
        "posY": 250,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S07_CARB_BRAKE,
        "posX": 340,
        "posY": 420,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S07_PEDESTRIAN_CHECK,
        "posX": 370,
        "posY": 110,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S07_CARB_STOP,
        "posX": 340,
        "posY": 170,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.TRIGGER_S08_PEDESTRIAN_FINISH,
        "posX": 270,
        "posY": 110,
        "angle": -90
    }
];

Situation01.prototype.instructionTexts = {
    bad: {
        name: "situationIntroducion",
        text: [
"Prezentacja przedstawia sytuację, gdzie (...)",
"(...)",
"(...)",
"(...)",
"(...)",
"Niebezpieczeństwo polega na (...)",
"(...)",
"(...)",
"(...)",
"Kierowca nie hamując wystarczająco wcześnie,",
"doprowadza do potrącenia pieszego."]
    },
    good: {
        name: "goodIntroduction",
        text: [
"Z braku rozwagi dochodzi do tragedii.",
"Jak powinna wyglądać prawidłowa sytuacja?"
        ]
    }
};