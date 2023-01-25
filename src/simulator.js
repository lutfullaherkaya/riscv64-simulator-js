"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulator = void 0;
var memory_1 = require("./memory");
var executer_1 = require("./executer");
var registery_1 = require("./registery");
var tokenFactory_1 = require("./tokenFactory");
var parser_1 = require("./parser");
var Simulator = /** @class */ (function () {
    function Simulator(asmText) {
        this.tokenizedLines = [];
        this.registery = new registery_1.Registery();
        this.memory = new memory_1.Memory();
        this.executer = new executer_1.Executer();
        var parser = new parser_1.default(asmText, new tokenFactory_1.TokenFactory(this.executer, this.registery));
        this.tokenizedLines = parser.parse();
    }
    Simulator.prototype.simulate = function () {
        this.memory.storeProgram(this.tokenizedLines);
        this.executer.execute(this.memory, this.registery);
    };
    return Simulator;
}());
exports.Simulator = Simulator;
//# sourceMappingURL=simulator.js.map