"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const fs = require("fs");
const yaml = require("js-yaml");
const merge = require("lodash.merge");
async function run() {
    const file = core.getInput('file', { required: true });
    const data = core.getInput('data', { required: true });
    var func_parse = (value) => JSON.parse(value);
    var func_dump = (value) => JSON.stringify(value);
    if (file.match(/\.y[a]?ml$/)) {
        func_parse = yaml.load;
        func_dump = yaml.dump;
    }
    var content;
    if (fs.existsSync(file)) {
        content = merge(func_parse(fs.readFileSync(file).toString()), yaml.load(data));
    }
    else {
        content = yaml.load(data);
    }
    fs.writeFileSync(file, func_dump(content));
}
run();
