import {Token} from "./tokens";
import {TokenFactory} from "./tokenFactory";

export default class Parser {
    private asmText: string;
    private tokenFactory: TokenFactory;

    /**
     *
     * @param asmText Raw assembly code with functions declared at top and global vars at bottom after .data
     * @param tokenFactory
     */
    constructor(asmText: string, tokenFactory: TokenFactory) {
        this.asmText = asmText;
        this.tokenFactory = tokenFactory
    }

    parse() {
        const asmTextLines = this.asmText.split('\n');
        const tokenizedLines: Array<Array<Token>> = [];
        asmTextLines.forEach((line) => {
            if (line.length > 0) {
                if (line.startsWith('.L_string')) { // special case for strings since they can contain comment char
                    const stringLabel = line.split(' ')[0];
                    tokenizedLines.push([
                        this.tokenFactory.createToken(stringLabel),
                        this.tokenFactory.createToken('.string'),
                        this.tokenFactory.createToken('"' + line.split('"')[1] + '"')
                    ]);
                } else {
                    const commentlessLine = line.split(';')[0].split('#')[0].trim();
                    if (commentlessLine.length > 0) {
                        let words = commentlessLine.split(/[ ,]+/)
                        let tokens: Token[] = [];
                        words.forEach((word) => {
                            tokens.push(this.tokenFactory.createToken(word));
                        });
                        tokenizedLines.push(tokens);
                    }
                }


            }
        });
        return tokenizedLines;

    }

}

