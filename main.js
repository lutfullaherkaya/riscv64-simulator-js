"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var simulator_1 = require("./src/simulator");
var voxAsm = fs.readFileSync(path.join(__dirname, 'sample.vox.s'));
// buffer to string
var simulator = new simulator_1.Simulator(voxAsm.toString('utf-8'));
console.log(simulator.simulate());
//# sourceMappingURL=main.js.map