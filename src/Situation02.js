function Situation02() {}

Situation02.prototype.title = ["Situation 02", "further description"];

Situation02.prototype.collisions = [
    ["triggerA", "carA"]
];

Situation02.prototype.situationPlan = [
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