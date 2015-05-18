function Situation02() {}

Situation02.prototype.sector = {
    x: 1,
    y: 1
};

Situation02.prototype.title = ["Przejeżdżanie przez", "ścieżkę rowerową"];

Situation02.prototype.collisions = [
    [sConstants.T02_01_CAR_INTRO, sConstants.OBJECT_CAR_A],
    [sConstants.T02_02_CAR_TURN, sConstants.OBJECT_CAR_A],
    [sConstants.OBJECT_CAR_A, sConstants.OBJECT_BIKE]
];

Situation02.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "bike",
        "name": sConstants.OBJECT_BIKE,
        "posX": 125,
        "posY": -80,
        "angle": 90
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": sConstants.OBJECT_CAR_A,
        "posX": 350,
        "posY": -100,
        "angle": 90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T02_01_CAR_INTRO,
        "posX": 350,
        "posY": 100,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T02_02_CAR_TURN,
        "posX": 350,
        "posY": 190,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "ball",
        "name": sConstants.OBJECT_ROTATION_P,
        "posX": 244,
        "posY": 170,
        "angle": 0
    }
];

Situation02.prototype.instructionTexts = {
    bad: {
        name: "situationIntroducion",
        text: [
"Prezentacja 2 (...)",
"(...)",
"(...)",
"(...)",
"(...)",
"Na (...)",
"(...)",
"(...)",
"(...)",
" ,",
"doprpieszego."]
    },
    good: {
        name: "goodIntroduction",
        text: [
"222.",
"J2222 prawidłowa sytuacja?"
        ]
    }
};