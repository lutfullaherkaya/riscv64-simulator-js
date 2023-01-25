"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelReference = exports.IntLiteral = exports.Directive = exports.Instruction = exports.Label = exports.AddressAccess = exports.Register = exports.Token = void 0;
var Token = /** @class */ (function () {
    function Token() {
    }
    return Token;
}());
exports.Token = Token;
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register(name, value) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.value = value;
        return _this;
    }
    return Register;
}(Token));
exports.Register = Register;
var AddressAccess = /** @class */ (function (_super) {
    __extends(AddressAccess, _super);
    function AddressAccess(register, index) {
        if (index === void 0) { index = 0; }
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.register = register;
        return _this;
    }
    return AddressAccess;
}(Token));
exports.AddressAccess = AddressAccess;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return Label;
}(Token));
exports.Label = Label;
var Instruction = /** @class */ (function (_super) {
    __extends(Instruction, _super);
    function Instruction(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return Instruction;
}(Token));
exports.Instruction = Instruction;
var Directive = /** @class */ (function (_super) {
    __extends(Directive, _super);
    function Directive(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return Directive;
}(Token));
exports.Directive = Directive;
var IntLiteral = /** @class */ (function (_super) {
    __extends(IntLiteral, _super);
    function IntLiteral(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    return IntLiteral;
}(Token));
exports.IntLiteral = IntLiteral;
var LabelReference = /** @class */ (function (_super) {
    __extends(LabelReference, _super);
    function LabelReference(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return LabelReference;
}(Token));
exports.LabelReference = LabelReference;
//# sourceMappingURL=tokens.js.map