// https://softwareengineering.stackexchange.com/questions/323293/static-factory-method-in-base-class
import {Executer} from "./executer";
import {Registery} from "./registery";
import {AddressAccess, Directive, Instruction, IntLiteral, Label, LabelReference, StrLiteral, Token} from "./tokens";

export class TokenFactory {
    executer: Executer;
    registery: Registery;

    constructor(instructionSet: Executer, registery: Registery) {
        this.executer = instructionSet;
        this.registery = registery;
    }

    createToken(word: string): Token {
        const addressAccessRegexMatch = word.match(/^(\d*)\((.+)\)$/);
        if (addressAccessRegexMatch) {
            // divide by 8 since we use array instead of 8 byte elemented ram
            return new AddressAccess(this.registery.regs[addressAccessRegexMatch[2]], Number(addressAccessRegexMatch[1]) / 8);
        } else if (word.startsWith('"') && word.endsWith('"')) {
            return new StrLiteral(word.slice(1, -1));
        } else if (this.registery.isReg(word)) {
            return this.registery.regs[word];
        } else if (this.executer.isInstruction(word)) {
            return new Instruction(word);
        } else if (!isNaN(Number(word))) {
            return new IntLiteral(Number(word));
        } else if (word.endsWith(':')) {
            return new Label(word);
        } else if (['.global', '.text', '.align', '.data', '.string', '.quad'].includes(word)) {
            return new Directive(word);
        } else {
            return new LabelReference(word);
            //throw new Error(`Unknown token: ${word}`);
        }
    }
}
