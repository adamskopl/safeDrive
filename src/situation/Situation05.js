function Situation05() {}

Situation05.prototype.sector = {
    x: 2,
    y: 0
};

Situation05.prototype.title = {
    pl: ["Autobus i", "wychodzący pasażerowie."],
    en: ["A bus and its", "passengers."]
};

Situation05.prototype.collisions = [
    [sConstants.T05_01_BUS_SLOW, sConstants.OBJECT_BUS],
    [sConstants.T05_01_BUS_STOP, sConstants.OBJECT_BUS],
    [sConstants.T05_02_PED_TURN, sConstants.OBJECT_PEDESTRIAN],
    [sConstants.T05_02_PED_TURN, sConstants.OBJECT_PEDESTRIAN_2],
    [sConstants.T05_02_PED_TURN, sConstants.OBJECT_PEDESTRIAN_3],
    [sConstants.T05_02_PED_TURN_BUS, sConstants.OBJECT_PEDESTRIAN_3],
    [sConstants.T05_03_PED_CONTINUE, sConstants.OBJECT_PEDESTRIAN_3],
    [sConstants.OBJECT_PEDESTRIAN_3, sConstants.OBJECT_CAR_A],
    [sConstants.T05_07_PED_CONTINUE_PROPER, sConstants.OBJECT_PEDESTRIAN_3],
    [sConstants.T05_02_PED_TURN_BUS, sConstants.OBJECT_PEDESTRIAN_2],
    [sConstants.T05_08_CAR_STOP, sConstants.OBJECT_CAR_A],
    [sConstants.T05_08_CAR_CONTINUE, sConstants.OBJECT_PEDESTRIAN_3]
];

Situation05.prototype.situationPlan = [

    {
        "type": "roadObject",
        "sprite": "pedestrian01",
        "name": sConstants.OBJECT_PEDESTRIAN,
        "posX": 352,
        "posY": 100 - 300,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "pedestrian02",
        "name": sConstants.OBJECT_PEDESTRIAN_2,
        "posX": 352,
        "posY": 60 - 300,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "pedestrian03",
        "name": sConstants.OBJECT_PEDESTRIAN_3,
        "posX": 352,
        "posY": 23 - 300,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "bus",
        "name": sConstants.OBJECT_BUS,
        "posX": 352,
        "posY": 50 - 300,
        "angle": 90
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": sConstants.OBJECT_CAR_A,
        "posX": 410,
        "posY": 600,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_01_BUS_SLOW,
        "posX": 350,
        "posY": 250,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_01_BUS_STOP,
        "posX": 350,
        "posY": 480,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger_big",
        "name": sConstants.T05_02_PED_TURN,
        "posX": 276,
        "posY": 410,
        "angle": 90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_02_PED_TURN_BUS,
        "posX": 300,
        "posY": 292,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_03_PED_CONTINUE,
        "posX": 362,
        "posY": 305,
        "angle": 90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_07_PED_CONTINUE_PROPER,
        "posX": 300,
        "posY": 100,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_08_CAR_STOP,
        "posX": 410,
        "posY": 145,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": sConstants.T05_08_CAR_CONTINUE,
        "posX": 480,
        "posY": 100,
        "angle": 90
    }
];

Situation05.prototype.instructionTexts = {
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
                "sytuacja?"
        ],
            en: []
        }
    }
};