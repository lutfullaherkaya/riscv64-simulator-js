import {Memory} from "./memory";
import {InstructionSet} from "./instructionSet";
import {Registery} from "./registery";
import {TokenFactory} from "./tokenFactory";
import Parser from "./parser";
import {Token} from "./tokens";

export class Simulator {
    registery: Registery;
    memory: Memory;
    instructionSet: InstructionSet;
    tokenizedLines: Array<Array<Token>> = [];
    constructor(asmText: string) {
        this.registery = new Registery();
        this.memory = new Memory();
        this.instructionSet = new InstructionSet();

        const parser = new Parser(asmText, new TokenFactory(this.instructionSet, this.registery));
        this.tokenizedLines = parser.parse();

    }

    simulate() {
        this.tokenizedLines.forEach((line) => {
            line.forEach((token) => {
                console.log(token);
            });
        });
        return 1;
    }
}
