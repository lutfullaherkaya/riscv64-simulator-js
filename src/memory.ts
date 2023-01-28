import {Directive, Instruction, IntLiteral, Label, LabelReference, StrLiteral, Token} from "./tokens";
import {Dir} from "fs";

export class Memory {
    // HIGHER_ADDRESS <-- heap <- data <- text <- HIGH_ADDRESS -> stack -> LOW_ADDRESS
    // right at the middle there is Halt Address
    haltAddress = 88888888;
    private ram = new Map<number, Array<Token>>([
        [this.haltAddress, [new Instruction('halt')]]
    ]);
    textPointer = this.haltAddress + 8;
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
                    // vector element type and value
                    this.addTextEntry([firstToken, line[1]]);
                    this.addTextEntry([firstToken, line[2]]);
                }
            } else if (firstToken instanceof Instruction) {
                this.addTextEntry(line);
            } else if (firstToken instanceof Label) {
                this.addLabelForCurrentTextEntry(firstToken);
                if (line.length > 1) {
                    if (line[1] instanceof Directive) {
                        if (line[1].name === '.quad') {
                            this.addTextEntry([line[1], line[2]]);
                        } else if (line[1].name === '.string') {
                            this.addTextEntry([line[1], line[2]]);
                        }
                    }

                }
            }
        });
    }

    addTextEntry(entry: Array<Token>) {
        this.ram.set(this.textPointer, entry);
        this.textPointer += 8;
    }

    calloc(length: number, size: number=8) {
        const addr = this.textPointer;
        for (let i = 0; i < length; i++) {
            this.addTextEntry([new Directive('.quad'), new IntLiteral(0)]);
        }
        return addr;
    }


    addLabelForCurrentTextEntry(label: Label) {
        this.labelAddresses[label.name] = this.textPointer;
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

    getBottomOfStackAddr() {
        return this.haltAddress - 8;
    }
}
