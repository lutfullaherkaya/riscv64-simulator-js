import {Instruction} from "./tokens";

export class InstructionSet {
    instructionNames: string[] = [
        'sd',
        'ld', 'la', 'li',
        'and', 'or', 'xori',
        'addi', 'add', 'sub',
        'call', 'bne', 'beq', 'j',
        'slli', 'slt', 'seqz',
    ];
    instructions: { [key: string]: Instruction } = {}

    constructor() {
        this.instructionNames.forEach((instructionName) => {
            this.instructions[instructionName] = new Instruction(instructionName);
        });
    }

    isInstruction(name: string): boolean {
        return name in this.instructions;
    }
}
