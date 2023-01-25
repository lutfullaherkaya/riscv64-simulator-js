import {Directive, Instruction, IntLiteral, Label, LabelReference, StrLiteral, Token} from "./tokens";

export class Memory {
    // text -> data -> stack
    memory: Array<Array<Token>> = [];
    labels: { [key: string]: number } = {}

    constructor() {

    }

    storeProgram(tokenizedLines: Array<Array<Token>>) {
        tokenizedLines.forEach((line) => {
            const firstToken = line[0];
            if (firstToken instanceof Directive) {
                if (firstToken.name === '.data') {
                    // do nothing
                } else if (firstToken.name === '.string') {
                    // impossible for vox
                } else if (firstToken.name === '.quad') {
                    this.addQuad([firstToken, line[1]]);
                    this.addQuad([firstToken, line[2]]);
                }
            } else if (firstToken instanceof Instruction) {
                this.addInstruction(line);
            } else if (firstToken instanceof Label) {
                this.addLabel(firstToken);
                if (line.length > 1) {
                    if (line[1] instanceof Directive) {
                        if (line[1].name === '.quad') {
                            this.addQuad([line[1], line[2]]);
                        } else if (line[1].name === '.string') {
                            this.addString([line[1], line[2]]);
                        }
                    }

                }
            }
        });
    }


    addInstruction(line: Array<Token>) {
        this.memory.push(line);
    }

    addLabel(label: Label) {
        this.labels[label.name] = this.memory.length;
    }

    addString(stringLine: Array<Token>) {
        this.memory.push(stringLine);
    }

    addQuad(quad: Array<Token>) {
        this.memory.push(quad);
    }

    get(index: number): Array<Token> {
        return this.memory[index];
    }

    set(index: number, value: Array<Token>) {
        this.memory[index] = value;
    }
}
