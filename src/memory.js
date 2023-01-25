"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
var tokens_1 = require("./tokens");
var Memory = /** @class */ (function () {
    function Memory() {
        // text -> data -> stack
        this.memory = [];
        this.labels = {};
    }
    Memory.prototype.storeProgram = function (tokenizedLines) {
        var _this = this;
        tokenizedLines.forEach(function (line) {
            var firstToken = line[0];
            if (firstToken instanceof tokens_1.Directive) {
                if (firstToken.name === '.data') {
                    // do nothing
                }
                else if (firstToken.name === '.string') {
                    // impossible for vox
                }
                else if (firstToken.name === '.quad') {
                    _this.addQuad([firstToken, line[1]]);
                    _this.addQuad([firstToken, line[2]]);
                }
            }
            else if (firstToken instanceof tokens_1.Instruction) {
                _this.addInstruction(line);
            }
            else if (firstToken instanceof tokens_1.Label) {
                _this.addLabel(firstToken);
                if (line.length > 1) {
                    if (line[1] instanceof tokens_1.Directive) {
                        if (line[1].name === '.quad') {
                            _this.addQuad([line[1], line[2]]);
                        }
                        else if (line[1].name === '.string') {
                            _this.addString([line[1], line[2]]);
                        }
                    }
                }
            }
        });
    };
    Memory.prototype.addInstruction = function (line) {
        this.memory.push(line);
    };
    Memory.prototype.addLabel = function (label) {
        this.labels[label.name] = this.memory.length;
    };
    Memory.prototype.addString = function (stringLine) {
        this.memory.push(stringLine);
    };
    Memory.prototype.addQuad = function (quad) {
        this.memory.push(quad);
    };
    Memory.prototype.get = function (index) {
        return this.memory[index];
    };
    Memory.prototype.set = function (index, value) {
        this.memory[index] = value;
    };
    return Memory;
}());
exports.Memory = Memory;
//# sourceMappingURL=memory.js.map