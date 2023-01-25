"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionSet = void 0;
var tokens_1 = require("./tokens");
var InstructionSet = /** @class */ (function () {
    function InstructionSet() {
        var _this = this;
        this.instructionNames = [
            'sd',
            'ld', 'la', 'li',
            'and', 'or', 'xori',
            'addi', 'add', 'sub',
            'call', 'bne', 'beq', 'j',
            'slli', 'slt', 'seqz',
        ];
        this.instructions = {};
        this.instructionNames.forEach(function (instructionName) {
            _this.instructions[instructionName] = new tokens_1.Instruction(instructionName);
        });
    }
    InstructionSet.prototype.isInstruction = function (name) {
        return name in this.instructions;
    };
    return InstructionSet;
}());
exports.InstructionSet = InstructionSet;
//# sourceMappingURL=instructionSet.js.map