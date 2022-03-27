const glob = require("glob")
const path = require('path')
const fs = require("fs");

const SOURCE_PATH = "/Users/mac/Workspace/2022/markdown/**";
const USE_PATH = process.env.HOME || process.env.USERPROFILE;
const CONFIG_PATH = path.join(USE_PATH, '.littrc');


function getSourceName(sources) {
    if (Array.isArray(sources)) {
        return sources.reduce((cache, value) => {
            const splitValue = value.split('/');
            if (Array.isArray(splitValue) && splitValue[splitValue.length - 1].endsWith('.md')) {
                cache.push({
                    name: splitValue[splitValue.length - 1].replace('.md', ''),
                    path: value
                });
            }
            return cache;
        }, [])
    }

    return [];
}

function GetMarkdownResource(callback) {
    glob(path.join(GetAppConfig(), '**'), (err, ctx) => {
        if (typeof callback === 'function') {
            let sources;
            if (!err) {
                sources = getSourceName(ctx);
            }
            callback(err, sources);
        }
    })
}

function GetSourcesSync() {
    const sources = glob.sync(path.join(GetAppConfig(), '**'));
    if (Array.isArray(sources)) {
        return getSourceName(sources);
    }
    return [];
}

function GetSourceSync(path) {
    return fs.readFileSync(path, "utf8");
}

function GetAppConfig() {
    if (fs.existsSync(CONFIG_PATH)) {
        return fs.readFileSync(CONFIG_PATH, "utf8");
    }
}

function SetAppConfig(config) {
    fs.writeFileSync(CONFIG_PATH, config);
}

module.exports = {
    GetMarkdownResource,
    GetSourcesSync,
    GetSourceSync,
    GetAppConfig,
    SetAppConfig
}