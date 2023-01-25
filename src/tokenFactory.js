"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFactory = void 0;
var tokens_1 = require("./tokens");
var TokenFactory = /** @class */ (function () {
    function TokenFactory(instructionSet, registery) {
        this.instructionSet = instructionSet;
        this.registery = registery;
    }
    TokenFactory.prototype.createToken = function (word) {
        var addressAccessRegexMatch = word.match(/^(\d*)\((.+)\)$/);
        if (addressAccessRegexMatch) {
            return new tokens_1.AddressAccess(this.registery.regs[addressAccessRegexMatch[2]], Number(addressAccessRegexMatch[1]));
        }
        else if (this.registery.isReg(word)) {
            return this.registery.regs[word];
        }
        else if (this.instructionSet.isInstruction(word)) {
            return this.instructionSet.instructions[word];
        }
        else if (!isNaN(Number(word))) {
            return new tokens_1.IntLiteral(Number(word));
        }
        else if (word.endsWith(':')) {
            return new tokens_1.Label(word);
        }
        else if (['.global', '.text', '.align', '.data', '.string'].includes(word)) {
            return new tokens_1.Directive(word);
        }
        else {
            return new tokens_1.LabelReference(word);
            //throw new Error(`Unknown token: ${word}`);
        }
    };
    return TokenFactory;
}());
exports.TokenFactory = TokenFactory;
//# sourceMappingURL=tokenFactory.js.map