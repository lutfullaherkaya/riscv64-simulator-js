import {Register, Token} from "./tokens";

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

    get(reg: Register|string): number {
        const regName = typeof reg === 'string' ? reg : reg.name;
        if (regName in this.regs) {
            return this.regs[regName].value;
        } else {
            throw new Error(`Register ${regName} does not exist`);
        }

    }

    set(reg: Register | string, val: number) {
        if (typeof reg === 'string') {
            this.regs[reg].value = val;
        } else {

            this.regs[reg.name].value = val;
        }
    }

    isReg(name: string): boolean {
        return name in this.regs;
    }
}
