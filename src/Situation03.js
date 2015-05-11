function Situation03() {}

Situation03.prototype.title = ["Situation 03", "further description"];

Situation03.prototype.collisions = [
    ["triggerA", "carA"]
];

Situation03.prototype.situationPlan = [
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

Situation03.prototype.instructionTexts = {
    bad: {
        name: "situationIntroducion",
        text: [
"Prezentacja 333333333333333 (...)",
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
"3333333333.",
"333333333333333 prawidłowa sytuacja?"
        ]
    }
};