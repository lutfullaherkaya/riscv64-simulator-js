// https://softwareengineering.stackexchange.com/questions/323293/static-factory-method-in-base-class
import {InstructionSet} from "./instructionSet";
import {Registery} from "./registery";
import {AddressAccess, Directive, IntLiteral, Label, LabelReference, Token} from "./tokens";

export class TokenFactory {
    instructionSet: InstructionSet;
    registery: Registery;

    constructor(instructionSet: InstructionSet, registery: Registery) {
        this.instructionSet = instructionSet;
        this.registery = registery;
    }

    createToken(word: string): Token {
        const addressAccessRegexMatch = word.match(/^(\d*)\((.+)\)$/);
        if (addressAccessRegexMatch) {
            return new AddressAccess(this.registery.regs[addressAccessRegexMatch[2]], Number(addressAccessRegexMatch[1]));
        } else if (this.registery.isReg(word)) {
            return this.registery.regs[word];
        } else if (this.instructionSet.isInstruction(word)) {
            return this.instructionSet.instructions[word];
        } else if (!isNaN(Number(word))) {
            return new IntLiteral(Number(word));
        } else if (word.endsWith(':')) {
            return new Label(word);
        } else if (['.global', '.text', '.align', '.data', '.string'].includes(word)) {
            return new Directive(word);
        } else {
            return new LabelReference(word);
            //throw new Error(`Unknown token: ${word}`);
        }
    }
}
