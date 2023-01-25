"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFactory = void 0;
var tokens_1 = require("./tokens");
var TokenFactory = /** @class */ (function () {
    function TokenFactory(instructionSet, registery) {
        this.executer = instructionSet;
        this.registery = registery;
    }
    TokenFactory.prototype.createToken = function (word) {
        var addressAccessRegexMatch = word.match(/^(\d*)\((.+)\)$/);
        if (addressAccessRegexMatch) {
            // divide by 8 since we use array instead of 8 byte elemented ram
            return new tokens_1.AddressAccess(this.registery.regs[addressAccessRegexMatch[2]], Number(addressAccessRegexMatch[1]) / 8);
        }
        else if (word.startsWith('"') && word.endsWith('"')) {
            return new tokens_1.StrLiteral(word.slice(1, -1));
        }
        else if (this.registery.isReg(word)) {
            return this.registery.regs[word];
        }
        else if (this.executer.isInstruction(word)) {
            return new tokens_1.Instruction(word);
        }
        else if (!isNaN(Number(word))) {
            return new tokens_1.IntLiteral(Number(word));
        }
        else if (word.endsWith(':')) {
            return new tokens_1.Label(word);
        }
        else if (['.global', '.text', '.align', '.data', '.string', '.quad'].includes(word)) {
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