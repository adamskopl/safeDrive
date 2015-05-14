function Situation02() {}

Situation02.prototype.sector = {
    x: 2,
    y: 0
};

Situation02.prototype.title = ["Przejeżdżanie przez", "ścieżkę rowerową"];

Situation02.prototype.collisions = [
    ["triggerA", "carA"]
];

Situation02.prototype.situationPlan = [
    {
        "type": "roadObject",
        "sprite": "jimmy",
        "name": "pedestrianA",
        "posX": 200,
        "posY": 100,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": "carA",
        "posX": 300,
        "posY": 300,
        "angle": -90
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