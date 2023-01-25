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
        });
        return tokenizedLines;

    }

}

