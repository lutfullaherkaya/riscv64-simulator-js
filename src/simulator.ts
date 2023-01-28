import {Memory} from "./memory";
import {Executer} from "./executer";
import {Registery} from "./registery";
import {TokenFactory} from "./tokenFactory";
import Parser from "./parser";
import {Directive, Instruction, Label, Token} from "./tokens";

export class Simulator {
    registery: Registery;
    memory: Memory;
    executer: Executer;
    tokenizedLines: Array<Array<Token>> = [];
    parser: Parser;

    constructor(asmText: string) {
        this.registery = new Registery();
        this.memory = new Memory();
        this.executer = new Executer();
        this.parser = new Parser(asmText, new TokenFactory(this.executer.getInstructionSet(), this.registery));
    }

    simulate() {
        this.tokenizedLines = this.parser.parse();
        this.memory.storeProgram(this.tokenizedLines);
        this.executer.execute(this.memory, this.registery);
    }

}
