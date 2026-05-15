"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nessus_node_1 = require("./Nessus.node");
const NessusApi_credentials_1 = require("./NessusApi.credentials");
exports.default = {
    nodes: [Nessus_node_1.Nessus],
    credentials: [NessusApi_credentials_1.NessusApi],
};
