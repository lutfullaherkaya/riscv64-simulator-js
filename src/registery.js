"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registery = void 0;
var tokens_1 = require("./tokens");
var Registery = /** @class */ (function () {
    function Registery() {
        var _this = this;
        this.regNames = [
            'zero', 'ra', 'sp',
            't0', 't1', 't2', 't3', 't4', 't5', 't6',
            's0', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11',
            'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'
        ];
        this.regs = {};
        this.regNames.forEach(function (regName) {
            _this.regs[regName] = new tokens_1.Register(regName, 0);
        });
    }
    Registery.prototype.get = function (reg) {
        if (typeof reg === 'string') {
            return this.regs[reg].value;
        }
        else {
            return this.regs[reg.name].value;
        }
    };
    Registery.prototype.set = function (reg, val) {
        if (typeof reg === 'string') {
            this.regs[reg].value = val;
        }
        else {
            this.regs[reg.name].value = val;
        }
    };
    Registery.prototype.isReg = function (name) {
        return name in this.regs;
    };
    return Registery;
}());
exports.Registery = Registery;
//# sourceMappingURL=registery.js.map