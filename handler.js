"use strict"
var atomicalgolia = require("atomic-algolia")
var deepmerge = require("deepmerge")
var request = require("request-promise-native")
var setTimeout = require("timers").setTimeout

module.exports = (context, cb) => {
    process.env = mergeEnv(context.secrets)

    var indexes = JSON.parse(process.env.INDEXES)
    var timeout = (process.env.timeout) ? process.env.timeout * 1000: 0
    var webhook = process.env.webhook

    indexes.forEach(function(index) {
        request({url: index.url, json: true})
        .then(function(data) {
            updateIndex(index.name, data, cb)
        })
        .catch(function(err) {
            cb(err)
        })
    })
}

var updateIndex = (indexName, data, cb) => {
  return atomicalgolia(indexName, data, {}, function(err, res) {
    if (err) cb(err)
    cb(null, res)
  })
}

var mergeEnv = (secrets) => {
  return deepmerge(process.env, secrets)
}

var triggerWebhook = (endpoint, payload, cb) => {
    if (!endpoint || !payload) return

    request.post(endpoint, {json:true})
        .then(res) {

        }
}
