import * as core from '@actions/core'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import merge = require('lodash.merge')

async function run() {

    // Get inputs
    var file = core.getInput('file', { required: true })
    var data = core.getInput('data', { required: true })

    // Prepare functions for handling source data
    var func_parse: any = JSON.parse
    var func_dump: any = JSON.stringify

    // Support for handling yaml in addition to json
    if (file.match(/\.y[a]?ml$/)) {
        func_parse = yaml.load
        func_dump = yaml.dump
    }

    var content: any

    // Check existence of source file
    if (fs.existsSync(file)) {
        // Merge content of file and provided yaml data
        content = merge(
            func_parse(fs.readFileSync(file).toString()),
            yaml.load(data))
    } else {
        // Simply use provided data
        content = yaml.load(data)
    }

    // Write content to file
    fs.writeFileSync(file, func_dump(content))
}

run()