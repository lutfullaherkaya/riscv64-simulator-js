"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executer = void 0;
var tokens_1 = require("./tokens");
var Executer = /** @class */ (function () {
    function Executer() {
        this.thisExecuter = this;
        this.instructionExecuters = {
            'sd': this.execSd.bind(this),
            'ld': this.execLd.bind(this),
            'la': function () {
            },
            'li': this.execLi.bind(this),
            'mv': this.execMv.bind(this),
            'and': function () {
            },
            'or': function () {
            },
            'xori': function () {
            },
            'addi': this.execAddi.bind(this),
            'add': function () {
            },
            'sub': function () {
            },
            'call': this.execCall.bind(this),
            'bne': function () {
            },
            'beq': function () {
            },
            'j': function () {
            },
            'slli': function () {
            },
            'slt': function () {
            },
            'seqz': function () {
            },
        };
        this.memory = null;
        this.registery = null;
        this.programCounter = 0;
    }
    Executer.prototype.isInstruction = function (name) {
        return name in this.instructionExecuters;
    };
    Executer.prototype.execute = function (memory, registery) {
        var _this = this;
        this.memory = memory;
        this.registery = registery;
        this.memory.addQuad(this.wrapToQuad(0));
        this.registery.set('sp', this.memory.memory.length - 1);
        // todo: while(programCounter) gibi bir şey olmalı
        this.memory.memory.forEach(function (line) {
            var firstToken = line[0];
            if (firstToken instanceof tokens_1.Instruction) {
                _this.execInstruction(firstToken, line.slice(1));
            }
            else if (firstToken instanceof tokens_1.Directive) {
                if (firstToken.name === '.quad') {
                    // pass
                }
                else if (firstToken.name === '.string') {
                    // pass
                }
            }
        });
    };
    Executer.prototype.execInstruction = function (instruction, args) {
        // todo: check if token instanceof LabelReference referenced label really exists else throw error
        this.instructionExecuters[instruction.name](instruction, args);
    };
    Executer.prototype.execAddi = function (instruction, args) {
        var resultReg = args[0];
        var operand1 = args[1];
        var immediate = args[2];
        this.registery.set(resultReg, this.registery.get(operand1) + immediate.value);
    };
    Executer.prototype.execSd = function (instruction, args) {
        var reg = args[0];
        var addressAccess = args[1];
        var data = this.registery.get(reg);
        this.memory.set(addressAccess.index + this.registery.get(addressAccess.register), this.wrapToQuad(data));
    };
    Executer.prototype.execLd = function (instruction, args) {
        var reg = args[0];
        var addressAccess = args[1];
        var data = this.memory.get(addressAccess.index + this.registery.get(addressAccess.register))[1];
        this.registery.set(reg, data.value);
    };
    Executer.prototype.execLi = function (instruction, args) {
        var reg = args[0];
        var immediate = args[1];
        this.registery.set(reg, immediate.value);
    };
    Executer.prototype.execMv = function (instruction, args) {
        var reg1 = args[0];
        var reg2 = args[1];
        this.registery.set(reg1, this.registery.get(reg2));
    };
    Executer.prototype.execCall = function (instruction, args) {
        // todo: print haric calismiyor cunku program counter kullanmiyorum henuz
        var label = args[0];
        this.registery.set('ra', this.programCounter + 1);
        if (label.name === '__vox_print__') {
            console.log('type: ', this.registery.get('a0'));
            console.log('value:', this.registery.get('a1'));
        }
        //this.programCounter = label.address;
    };
    Executer.prototype.wrapToQuad = function (value) {
        return [new tokens_1.Directive('.quad'), new tokens_1.IntLiteral(value)];
    };
    return Executer;
}());
exports.Executer = Executer;
//# sourceMappingURL=executer.js.map