"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulator = void 0;
var memory_1 = require("./memory");
var instructionSet_1 = require("./instructionSet");
var registery_1 = require("./registery");
var tokenFactory_1 = require("./tokenFactory");
var parser_1 = require("./parser");
var Simulator = /** @class */ (function () {
    function Simulator(asmText) {
        this.tokenizedLines = [];
        this.registery = new registery_1.Registery();
        this.memory = new memory_1.Memory();
        this.instructionSet = new instructionSet_1.InstructionSet();
        var parser = new parser_1.default(asmText, new tokenFactory_1.TokenFactory(this.instructionSet, this.registery));
        this.tokenizedLines = parser.parse();
    }
    Simulator.prototype.simulate = function () {
        this.tokenizedLines.forEach(function (line) {
            line.forEach(function (token) {
                console.log(token);
            });
        });
        return 1;
    };
    return Simulator;
}());
exports.Simulator = Simulator;
//# sourceMappingURL=simulator.js.map