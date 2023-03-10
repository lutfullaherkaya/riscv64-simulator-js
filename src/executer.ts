import {
    AddressAccess,
    Directive,
    Instruction,
    IntLiteral,
    Label,
    LabelReference,
    Register,
    StrLiteral,
    Token
} from "./tokens";
import {Memory} from "./memory";
import {Registery} from "./registery";

const VOX_INT = 0;
const VOX_VECTOR = 1;
const VOX_BOOL = 2;
const VOX_STRING = 3;

export class Executer {
    thisExecuter = this;
    instructionExecuters: { [key: string]: (instruction: Instruction, args: Array<Token>) => void } = {
        'sd': this.execSd.bind(this),
        'ld': this.execLd.bind(this),
        'la': this.execLa.bind(this),
        'li': this.execLi.bind(this),
        'mv': this.execMv.bind(this),
        'and': this.execAnd.bind(this),
        'or': this.execOr.bind(this),
        'xori': this.execXori.bind(this),
        'addi': this.execAddi.bind(this),
        'add': this.execAdd.bind(this),
        'sub': this.execSub.bind(this),
        'call': this.execCall.bind(this),
        'ret': this.execRet.bind(this),
        'bne': this.execBne.bind(this),
        'beq': this.execBeq.bind(this),
        'j': this.execJ.bind(this),
        'slli': this.execSlli.bind(this),
        'slt': this.execSlt.bind(this),
        'seqz': this.execSeqz.bind(this),
        'halt': this.execHalt.bind(this),
    };
    memory: Memory | null = null;
    registery: Registery | null = null;
    programCounter = -1;
    voxLib: VoxLib | null = null;

    constructor() {

    }

    isInstruction(name: string): boolean {
        return name in this.instructionExecuters;
    }

    getInstructionSet(): Set<string> {
        return new Set(Object.keys(this.instructionExecuters));
    }


    execute(memory: Memory, registery: Registery) {
        this.memory = memory;
        this.registery = registery;
        this.voxLib = new VoxLib(memory, registery);

        this.memory.addTextEntry(Executer.wrapToQuad(0));
        this.registery.set('sp', this.memory.getBottomOfStackAddr());
        this.registery.set('ra', this.memory.haltAddress - 8); // - 8 since it is incremented in the loop
        this.programCounter = this.memory.labelAddresses['main'];

        while (true) {
            // fetch
            const line = this.memory.get(this.programCounter);

            // decode
            const instruction = line[0] as Instruction;
            const args = line.slice(1);

            // execute
            if (instruction.name !== 'halt') {
                this.execInstruction(instruction, args);
                this.programCounter += 8;
            } else {
                break;
            }
        }
    }

    execInstruction(instruction: Instruction, args: Array<Token>) {
        // todo: check if token instanceof LabelReference referenced label really exists else throw error
        if (instruction.name in this.instructionExecuters) {
            this.instructionExecuters[instruction.name](instruction, args);
        } else {
            throw new Error('Unknown instruction: ' + instruction.name);
        }

    }

    execAddi(instruction: Instruction, args: Array<Token>) {
        const resultReg = args[0] as Register;
        const operand1 = args[1] as Register;
        const immediate = args[2] as IntLiteral;

        this.registery!.set(resultReg, this.registery!.get(operand1) + immediate.value);
    }

    execAdd(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const reg3 = args[2] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2) + this.registery!.get(reg3));
    }

    execSub(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const reg3 = args[2] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2) - this.registery!.get(reg3));
    }

    execSd(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const addressAccess = args[1] as AddressAccess;


        const data = this.registery!.get(reg);
        this.memory!.set(addressAccess.index + this.registery!.get(addressAccess.register), Executer.wrapToQuad(data));

    }

    execLd(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const data = this.getIntValue(args[1]);
        this.registery!.set(reg, data);
    }

    getIntValue(token: Token): number {
        if (token instanceof IntLiteral) {
            return token.value;
        } else if (token instanceof Register) {
            return this.registery!.get(token);
        } else if (token instanceof AddressAccess) {
            const pointedToken = this.memory!.get(token.index + this.registery!.get(token.register))[1];
            if (pointedToken instanceof IntLiteral) {
                return pointedToken.value;
            } else {
                throw new Error('Cannot get value of non-int literal');
            }
        } else if (token instanceof LabelReference) {
            const pointedToken = this.memory!.get(this.memory!.labelAddresses[token.name])[1];
            if (pointedToken instanceof IntLiteral) {
                return pointedToken.value;
            } else if (pointedToken instanceof LabelReference) {
                return this.memory!.labelAddresses[pointedToken.name];
            }
        } else {
            throw new Error('Unknown token type: ' + token);
        }
        throw new Error("Can't get int value of token: " + token);
    }

    execLi(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const immediate = args[1] as IntLiteral;

        this.registery!.set(reg, immediate.value);
    }

    execLa(instruction: Instruction, args: Array<Token>) {
        const reg = args[0] as Register;
        const label = args[1] as Label;

        this.registery!.set(reg, this.memory!.labelAddresses[label.name]);
    }

    execMv(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2));
    }

    execAnd(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const reg3 = args[2] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2) & this.registery!.get(reg3));
    }

    execOr(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const reg3 = args[2] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2) | this.registery!.get(reg3));
    }

    execXori(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const immediate = args[2] as IntLiteral;

        this.registery!.set(reg1, this.registery!.get(reg2) ^ immediate.value);
    }

    execCall(instruction: Instruction, args: Array<Token>) {
        // todo: print haric calismiyor cunku program counter kullanmiyorum henuz
        const label = args[0] as Label;
        this.registery!.set('ra', this.programCounter);

        let resultVar: VoxVariable = new VoxVariable(VOX_INT, 0);
        if (['__vox_print__', '__vox_add__', '__vox_sub__', '__vox_mul__', '__vox_div__'].includes(label.name)) {
            switch (label.name) {
                case '__vox_print__':
                    this.voxLib!.__vox_print__();
                    break;
                case '__vox_add__':
                    resultVar = this.voxLib!.__vox_arithmetic__('add');
                    break;
                case '__vox_sub__':
                    resultVar = this.voxLib!.__vox_arithmetic__('sub');
                    break;
                case '__vox_mul__':
                    resultVar = this.voxLib!.__vox_arithmetic__('mul');
                    break;
                case '__vox_div__':
                    resultVar = this.voxLib!.__vox_arithmetic__('div');
                    break;
            }
            this.registery!.set('a0', resultVar.type);
            this.registery!.set('a1', resultVar.value);
        } else {
            this.programCounter = this.memory!.labelAddresses[label.name] - 8;
        }

    }

    execRet(instruction: Instruction, args: Array<Token>) {
        this.programCounter = this.registery!.get('ra');
    }

    execBne(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const label = args[2] as Label;
        if (this.registery!.get(reg1) !== this.registery!.get(reg2)) {
            this.programCounter = this.memory!.labelAddresses[label.name] - 8;
        }
    }

    execBeq(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const label = args[2] as Label;
        if (this.registery!.get(reg1) === this.registery!.get(reg2)) {
            this.programCounter = this.memory!.labelAddresses[label.name] - 8;
        }
    }

    execJ(instruction: Instruction, args: Array<Token>) {
        const label = args[0] as Label;
        this.programCounter = this.memory!.labelAddresses[label.name] - 8;
    }

    execSlli(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const immediate = args[2] as IntLiteral;

        this.registery!.set(reg1, this.registery!.get(reg2) << immediate.value);
    }

    execSlt(instruction: Instruction, args: Array<Token>) { // slt a, b, c: a = b < c
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;
        const reg3 = args[2] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2) < this.registery!.get(reg3) ? 1 : 0);
    }

    execSeqz(instruction: Instruction, args: Array<Token>) {
        const reg1 = args[0] as Register;
        const reg2 = args[1] as Register;

        this.registery!.set(reg1, this.registery!.get(reg2) === 0 ? 1 : 0);
    }

    execHalt(instruction: Instruction, args: Array<Token>) {
        // handled outside the loop
    }

    static wrapToQuad(value: number): Array<Token> {
        return [new Directive('.quad'), new IntLiteral(value)];
    }
}

class VoxVariable {
    type: number;
    value: number;

    constructor(type: number, value: number) {
        this.type = type;
        this.value = value;
    }
}

class VoxLib {
    memory: Memory | null = null;
    registery: Registery | null = null;

    constructor(memory: Memory, registery: Registery) {
        this.memory = memory;
        this.registery = registery;


    }

    getVectorLength(vectorAddr: number): number {
        return (this.memory!.get(vectorAddr - 8)[1] as IntLiteral).value;
    }

    getVector(vectorAddr: number): Array<VoxVariable> {
        const vectorLength = this.getVectorLength(vectorAddr);
        const vector = [];
        for (let i = 0; i < vectorLength; i++) {
            const elmType = (this.memory!.get(vectorAddr + (i * 2) * 8)[1] as IntLiteral).value;
            const elmValue = (this.memory!.get(vectorAddr + (i * 2 + 1) * 8)[1] as IntLiteral).value;
            vector.push(new VoxVariable(elmType, elmValue));
        }
        return vector;
    }

    __vox_print__() {
        const arg1 = new VoxVariable(this.registery!.get('a0'), this.registery!.get('a1'))
        console.log(this.__vox_print_without_newline__(arg1));
    }

    __vox_print_without_newline__(voxVar: VoxVariable, printStrQuotes = false) {
        switch (voxVar.type) {
            case VOX_INT:
                return voxVar.value.toString();
                break;
            case VOX_VECTOR:
                let returnStr = "[";
                const vector = this.getVector(voxVar.value);
                vector.forEach((element, i) => {
                    returnStr += this.__vox_print_without_newline__(element, true);
                    if (i !== vector.length - 1) {
                        returnStr += ', ';
                    }
                })
                returnStr += ']';
                return returnStr;
                break;
            case VOX_BOOL:
                return String(voxVar.value !== 0);
                break;
            case VOX_STRING:
                const str = (this.memory!.get(voxVar.value)[1] as StrLiteral).value;
                if (printStrQuotes) {
                    /* todo: escape newlines and tabs */
                    return '"' + str + '"';
                } else {
                    return str;
                }
                break;
        }
    }

    __vox_arithmetic__(op: 'add' | 'sub' | 'div' | 'mul',
                       arg1 = new VoxVariable(this.registery!.get('a0'), this.registery!.get('a1')),
                       arg2 = new VoxVariable(this.registery!.get('a2'), this.registery!.get('a3'))) {
        let resultVar = new VoxVariable(VOX_INT, 0);
        if (arg1.type === VOX_INT && arg2.type === VOX_INT) {
            switch (op) {
                case 'add':
                    resultVar = new VoxVariable(VOX_INT, arg1.value + arg2.value);
                    break;
                case 'sub':
                    resultVar = new VoxVariable(VOX_INT, arg1.value - arg2.value);
                    break;
                case 'div':
                    resultVar = new VoxVariable(VOX_INT, arg1.value / arg2.value);
                    break;
                case 'mul':
                    resultVar = new VoxVariable(VOX_INT, arg1.value * arg2.value);
                    break;
            }
            resultVar.value = Math.trunc(resultVar.value);


        } else {
            const resultVector = [];
            if (arg1.type === VOX_VECTOR && arg2.type === VOX_VECTOR) {
                const vector1 = this.getVector(arg1.value);
                const vector2 = this.getVector(arg2.value);
                if (vector1.length !== vector2.length) {
                    throw new Error('Vector sizes of '
                        + this.__vox_print_without_newline__(arg1)
                        + ' and '
                        + this.__vox_print_without_newline__(arg2)
                        + ' do not match. Runtime error :(');
                }

                for (let i = 0; i < vector1.length; i++) {
                    resultVector.push(this.__vox_arithmetic__(op, vector1[i], vector2[i]));
                }
            } else if (arg1.type === VOX_VECTOR) {
                const vector1 = this.getVector(arg1.value);
                for (let i = 0; i < vector1.length; i++) {
                    resultVector.push(this.__vox_arithmetic__(op, vector1[i], arg2));
                }
            } else if (arg2.type === VOX_VECTOR) {
                const vector2 = this.getVector(arg2.value);
                for (let i = 0; i < vector2.length; i++) {
                    resultVector.push(this.__vox_arithmetic__(op, arg1, vector2[i]));
                }
            }
            const resultVectorAddr = this.memory!.calloc(resultVector.length * 2 + 1);
            resultVar.type = VOX_VECTOR;
            resultVar.value = resultVectorAddr + 8; // first element is vector length
            this.memory!.set(resultVectorAddr, Executer.wrapToQuad(resultVector.length));
            resultVector.forEach((element, i) => {
                this.memory!.set(resultVectorAddr + (1 + i * 2) * 8, Executer.wrapToQuad(element.type));
                this.memory!.set(resultVectorAddr + (1 + i * 2 + 1) * 8, Executer.wrapToQuad(element.value));
            });

        }
        return resultVar;
    }
}
