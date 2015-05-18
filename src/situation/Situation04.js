function Situation04() {}

Situation04.prototype.sector = {
    x: 1,
    y: 2
};

Situation04.prototype.title = ["Wymijanie na", "przejściu dla pieszych."];

Situation04.prototype.collisions = [
        [sConstants.T04_02_OVERTAKE_INTRO, sConstants.OBJECT_CAR_B],
        [sConstants.T04_03_OVERTAKE_PEDESTRIAN, sConstants.OBJECT_CAR_B],
        [sConstants.T04_04_BAD_END, sConstants.OBJECT_CAR_B]
];

Situation04.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": sConstants.OBJECT_CAR_A,
        "posX": 405,
        "posY": 800,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": sConstants.OBJECT_CAR_B,
        "posX": 343,
        "posY": 800,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T04_02_OVERTAKE_INTRO,
        "posX": 340,
        "posY": 400,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T04_03_OVERTAKE_PEDESTRIAN,
        "posX": 340,
        "posY": 250,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T04_04_BAD_END,
        "posX": 340,
        "posY": 60,
        "angle": 0
    }
];

Situation04.prototype.instructionTexts = {
    bad: {
        name: "situationIntroducion",
        text: [
"Prezentacja 444444444444 (...)",
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
"44444444.",
"44444444444 prawidłowa sytuacja?"
        ]
    }
};