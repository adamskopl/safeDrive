function Situation01() {}

Situation01.prototype.sector = {
    x: 0,
    y: 2
};

Situation01.prototype.title = ["Wymijanie na przejściu", "dla pieszych"];

Situation01.prototype.collisions = [
    ["pedestrianA", "carA"],
    ["pedestrianA", "carB"],
    ["triggerA", "carA"],
    ["triggerA", "carB"],
    ["triggerB", "carA"],
    ["carB", "pedestrianA"],
    ["triggerC", "carB"],
    ["tCarBIntroInfo", "carB"],
    ["testTriggerFinishA", "pedestrianA"],
    ["testTriggerFinishB", "pedestrianA"],
    ["testTriggerFinishC", "pedestrianA"]
];

Situation01.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "jimmy",
        "name": "pedestrianA",
        "posX": 470,
        "posY": 145,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": "carA",
        "posX": 320,
        "posY": 750,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": "carB",
        "posX": 288,
        "posY": 380,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerA",
        "posX": 300,
        "posY": 290,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerB",
        "posX": 330,
        "posY": 200,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerC",
        "posX": 295,
        "posY": 200,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "tCarBIntroInfo",
        "posX": 288,
        "posY": 290,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "testTriggerFinishA",
        "posX": 290,
        "posY": 140,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "testTriggerFinishB",
        "posX": 270,
        "posY": 140,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "testTriggerFinishC",
        "posX": 250,
        "posY": 140,
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
"Z braku rozwagi może dojść do tragedii.",
"Jak powinna wyglądać prawidłowa sytuacja?"
        ]
    }
};