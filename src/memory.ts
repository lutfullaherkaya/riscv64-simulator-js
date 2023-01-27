import {Directive, Instruction, IntLiteral, Label, LabelReference, StrLiteral, Token} from "./tokens";
import {Dir} from "fs";

export class Memory {
    // HIGH_ADDRESS -> text -> data -> stack -> LOW_ADDRESS
    haltAddress = 88888888;
    private ram = new Map<number, Array<Token>>([
        [this.haltAddress, [new Instruction('halt')]]
    ]);
    textPointer = this.haltAddress - 8;
    labelAddresses: { [key: string]: number } = {}

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

    addTextEntry(entry: Array<Token>) {
        this.ram.set(this.textPointer, entry);
        this.textPointer -= 8;
    }

    addInstruction(line: Array<Token>) {
        this.addTextEntry(line);
    }

    addLabel(label: Label) {
        this.labelAddresses[label.name] = this.textPointer;
    }

    addString(stringLine: Array<Token>) {
        this.addTextEntry(stringLine);
    }

    addQuad(quad: Array<Token>) {
        this.addTextEntry(quad);
    }

    get(index: number): Token[] {
        if (!this.ram.has(index)) {
            this.ram.set(index, [new Directive('.quad'), new IntLiteral(0)]);
        }
        return this.ram.get(index)!;
    }

    set(index: number, value: Array<Token>) {
        this.ram.set(index, value);
    }
}
