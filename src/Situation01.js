function Situation01() {}

Situation01.prototype.title = ["Situation 01", "further description"];

Situation01.prototype.collisions = [
    ["pedestrianA", "carA"],
    ["pedestrianA", "carB"],
    ["triggerA", "carA"],
    ["triggerA", "carB"],
    ["triggerB", "carA"],
    ["carB", "pedestrianA"],
    ["triggerC", "carB"],
    ["tCarBIntroInfo", "carB"]
];

Situation01.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "jimmy",
        "name": "pedestrianA",
        "posX": 370,
        "posY": 395,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": "carA",
        "posX": 220,
        "posY": 1000,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": "carB",
        "posX": 188,
        "posY": 630,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerA",
        "posX": 200,
        "posY": 540,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerB",
        "posX": 230,
        "posY": 450,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerC",
        "posX": 195,
        "posY": 450,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "tCarBIntroInfo",
        "posX": 188,
        "posY": 540,
        "angle": 0
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