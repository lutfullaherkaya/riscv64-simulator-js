import {AddressAccess, Directive, Instruction, IntLiteral, Label, Register, Token} from "./tokens";
import {Memory} from "./memory";
import {Registery} from "./registery";

export class Executer {
    thisExecuter = this;
    instructionExecuters: { [key: string]: (instruction: Instruction, args: Array<Token>) => void } = {
        'sd': this.execSd.bind(this),
        'ld': this.execLd.bind(this),
        'la': () => {
        },
        'li': this.execLi.bind(this),
        'mv': this.execMv.bind(this),
        'and': () => {
        },
        'or': () => {
        },
        'xori': () => {
        },
        'addi': this.execAddi.bind(this),
        'add': () => {
        },
        'sub': () => {
        },
        'call': this.execCall.bind(this),
        'bne': () => {
        },
        'beq': () => {
        },
        'j': () => {
        },
        'slli': () => {
        },
        'slt': () => {
        },
        'seqz': () => {
        },
    };
    memory: Memory | null = null;
    registery: Registery | null = null;
    programCounter = 0;


    constructor() {

    }

    isInstruction(name: string): boolean {
        return name in this.instructionExecuters;
    }


    execute(memory: Memory, registery: Registery) {
        this.memory = memory;
        this.registery = registery;

        this.memory.addQuad(this.wrapToQuad(0));
        this.registery.set('sp', this.memory.memory.length - 1);

        // todo: while(programCounter) gibi bir şey olmalı

        this.memory.memory.forEach((line) => {
            const firstToken = line[0];
            if (firstToken instanceof Instruction) {
                this.execInstruction(firstToken, line.slice(1));
            } else if (firstToken instanceof Directive) {
                if (firstToken.name === '.quad') {
                    // pass
                } else if (firstToken.name === '.string') {
                    // pass
                }
            }
        });

    }

    execInstruction(instruction: Instruction, args: Array<Token>) {
        // todo: check if token instanceof LabelReference referenced label really exists else throw error
        this.instructionExecuters[instruction.name](instruction, args);
    }

    execAddi(instruction: Instruction, args: Array<Token>) {
        const resultReg = args[0] as Register;
        const operand1 = args[1] as Register;
        const immediate = args[2] as IntLiteral;

        this.registery!.set(resultReg, this.registery!.get(operand1) + immediate.value);
    }

    execSd(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const addressAccess = args[1] as AddressAccess;


        const data = this.registery!.get(reg);
        this.memory!.set(addressAccess.index + this.registery!.get(addressAccess.register), this.wrapToQuad(data));

    }

    execLd(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const addressAccess = args[1] as AddressAccess;

        const data = this.memory!.get(addressAccess.index + this.registery!.get(addressAccess.register))[1] as IntLiteral;
        this.registery!.set(reg, data.value);

    }

    execLi(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const immediate = args[1] as IntLiteral;

        this.registery!.set(reg, immediate.value);
    }

    execMv(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2));
    }

    execCall(instruction: Instruction, args: Array<Token>) {
        // todo: print haric calismiyor cunku program counter kullanmiyorum henuz
        const label = args[0] as Label;
        this.registery!.set('ra', this.programCounter + 1);
        if (label.name === '__vox_print__') {
            console.log('type: ', this.registery!.get('a0'));
            console.log('value:', this.registery!.get('a1'));
        }
        //this.programCounter = label.address;
    }

    wrapToQuad(value: number): Array<Token> {
        return [new Directive('.quad'), new IntLiteral(value)];
    }
}
