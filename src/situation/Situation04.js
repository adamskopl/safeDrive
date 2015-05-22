function Situation04() {}

Situation04.prototype.sector = {
    x: 1,
    y: 2
};

Situation04.prototype.title = {
    pl: ["Wyprzedzanie na", "przejściu dla pieszych."],
    en: ["An overtake at a", "pedestrian crossing."]
};

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
        "posX": 530,
        "posY": 800,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": sConstants.OBJECT_CAR_B,
        "posX": 468,
        "posY": 800,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T04_02_OVERTAKE_INTRO,
        "posX": 465,
        "posY": 280,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T04_03_OVERTAKE_PEDESTRIAN,
        "posX": 465,
        "posY": 135,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T04_04_BAD_END,
        "posX": 465,
        "posY": 60,
        "angle": 0
    }
];

Situation04.prototype.instructionTexts = {
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
                "Jak powinna wyglądać prawidłowa",
                "sytuacja?"
        ],
            en: []
        }
    }
};