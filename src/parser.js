"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    /**
     *
     * @param asmText Raw assembly code with functions declared at top and global vars at bottom after .data
     * @param tokenFactory
     */
    function Parser(asmText, tokenFactory) {
        this.asmText = asmText;
        this.tokenFactory = tokenFactory;
    }
    Parser.prototype.parse = function () {
        var _this = this;
        var asmTextLines = this.asmText.split('\n');
        var tokenizedLines = [];
        asmTextLines.forEach(function (line) {
            if (line.length > 0) {
                if (line.startsWith('.L_string')) { // special case for strings since they can contain comment char
                    var stringLabel = line.split(' ')[0];
                    tokenizedLines.push([
                        _this.tokenFactory.createToken(stringLabel),
                        _this.tokenFactory.createToken('.string'),
                        _this.tokenFactory.createToken('"' + line.split('"')[1] + '"')
                    ]);
                }
                else {
                    var commentlessLine = line.split(';')[0].split('#')[0].trim();
                    if (commentlessLine.length > 0) {
                        var words = commentlessLine.split(/[ ,]+/);
                        var tokens_1 = [];
                        words.forEach(function (word) {
                            tokens_1.push(_this.tokenFactory.createToken(word));
                        });
                        tokenizedLines.push(tokens_1);
                    }
                }
            }
        });
        return tokenizedLines;
    };
    return Parser;
}());
exports.default = Parser;
//# sourceMappingURL=parser.js.map