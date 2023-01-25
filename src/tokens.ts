export abstract class Token {


}

export class Register extends Token {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        super();
        this.name = name;
        this.value = value;
    }
}

export class AddressAccess extends Token {
    register: Register;
    index: number;

    constructor(register: Register, index: number = 0) {
        super();
        this.index = index;
        this.register = register;
    }

}

export class Label extends Token {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}

export class Instruction extends Token {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}

export class Directive extends Token {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}

export class IntLiteral extends Token {
    value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

export class StrLiteral extends Token {
    value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }
}

export class LabelReference extends Token {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
