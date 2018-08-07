"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = require("history");
const pathToRegexp = require("path-to-regexp");
const rahisi_1 = require("rahisi");
const history = history_1.createHashHistory();
exports.Link = (props, children) => {
    const attributes = rahisi_1.React.getAttributes(props);
    const kids = rahisi_1.React.getChildren(children);
    attributes.push(new rahisi_1.OnHandlerA("click", (event) => {
        event.preventDefault();
        history.push({
            pathname: event.currentTarget.pathname,
            search: event.currentTarget.search,
        });
    }));
    return new rahisi_1.BaseElement("a", attributes, kids);
};
function matchURI(path, uri) {
    const keys = [];
    const pattern = pathToRegexp(path, keys);
    const match = pattern.exec(uri);
    if (!match) {
        return null;
    }
    const params = new Map();
    for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
            params.set(keys[i - 1].name, match[i]);
        }
    }
    return params;
}
function resolve(routes, noMatch) {
    const uri = history.location.pathname;
    for (const route of routes) {
        const params = matchURI(route.path, uri);
        if (!params) {
            continue;
        }
        const result = route.action(params);
        return result;
    }
    return noMatch();
}
exports.resolve = resolve;
//# sourceMappingURL=routing.js.map