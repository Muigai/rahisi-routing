"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegexp = require("path-to-regexp");
const rahisi_1 = require("rahisi");
const history = window.history;
exports.Link = (props, children) => {
    const attributes = rahisi_1.React.getAttributes(props);
    const kids = rahisi_1.React.getChildren(children);
    attributes.push(new rahisi_1.OnHandlerA("click", (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const url = `${target.pathname}${target.search}`;
        history.pushState({}, "", url);
    }));
    return new rahisi_1.BaseElement("a", attributes, kids);
};
function matchURI(path, uri) {
    const keys = [];
    const pattern = pathToRegexp(path, keys); // cache?
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
function resolve(route) {
    const uri = window.location.pathname;
    const params = matchURI(route.path, uri);
    return params;
}
exports.resolve = resolve;
exports.Switch = (routes, noMatch) => {
    const test = routes.map((a) => {
        return {
            test: () => resolve(a) != null,
            renderable: resolve(a) ? () => a.action(resolve(a)) : noMatch,
        };
    });
    return new rahisi_1.ConditionalRenderElement(test, noMatch);
};
//# sourceMappingURL=routing.js.map