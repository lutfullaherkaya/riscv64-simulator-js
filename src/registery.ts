import {Register} from "./tokens";

export class Registery {
    regNames: string[] = [
        'zero', 'ra', 'sp',
        't0', 't1', 't2', 't3', 't4', 't5', 't6',
        's0', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11',
        'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'
    ];
    regs: { [key: string]: Register } = {}

    constructor() {
        this.regNames.forEach((regName) => {
            this.regs[regName] = new Register(regName, 0);
        });
    }

    isReg(name: string): boolean {
        return name in this.regs;
    }
}