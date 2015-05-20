function Situation03() {}

Situation03.prototype.sector = {
    x: 0,
    y: 0
};

Situation03.prototype.title = ["Rowerzysta na", "przejściu dla pieszych."];

Situation03.prototype.collisions = [
    [sConstants.T03_01_CAR_INTRO, sConstants.OBJECT_CAR_A],
    [sConstants.T03_02_CAR_TURN, sConstants.OBJECT_CAR_A],
    [sConstants.OBJECT_CAR_A, sConstants.OBJECT_BIKE],
    [sConstants.T03_06_BIKE_STOP, sConstants.OBJECT_BIKE],
    [sConstants.T03_08_CAR_CONTINUE, sConstants.OBJECT_BIKE]
];

Situation03.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "bike",
        "name": sConstants.OBJECT_BIKE,
        "posX": 465,
        "posY": 600,
        "angle": 90
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": sConstants.OBJECT_CAR_A,
        "posX": 250,
        "posY": 900,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "ball",
        "name": sConstants.OBJECT_ROTATION_P,
        "posX": 350,
        "posY": 226,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T03_01_CAR_INTRO,
        "posX": 250,
        "posY": 350,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T03_02_CAR_TURN,
        "posX": 250,
        "posY": 210,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T03_06_BIKE_STOP,
        "posX": 460,
        "posY": 160,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T03_08_CAR_CONTINUE,
        "posX": 460,
        "posY": 20,
        "angle": 0
    }
];

Situation03.prototype.instructionTexts = {
    bad: {
        name: "situationIntroducion",
        text: [
        "Opis sytuacji.",
        "Opis sytuacji.",
        "Opis sytuacji."]
    },
    good: {
        name: "goodIntroduction",
        text: [
                "Z braku rozwagi dochodzi do tragedii.",
                "Jak powinna wyglądać prawidłowa",
                "sytuacja?"
        ]
    }
};