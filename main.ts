import * as fs from 'fs';
import * as path from 'path';
import {Simulator} from "./src/simulator";

const voxAsm = fs.readFileSync(path.join(__dirname, 'sample3.vox.s'));
// buffer to string
const simulator = new Simulator(voxAsm.toString('utf-8'));
simulator.simulate();
