"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = require("history");
const pathToRegexp = require("path-to-regexp");
const rahisi_1 = require("rahisi");
const history = history_1.createBrowserHistory();
exports.Link = (props) => {
    const attributes = rahisi_1.React.getAttributes(props);
    attributes.push(new rahisi_1.OnHandlerA("click", (event) => {
        event.preventDefault();
        history.push({
            pathname: event.currentTarget.pathname,
            search: event.currentTarget.search,
        });
    }));
    return new rahisi_1.BaseElement("a", attributes);
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
    return __awaiter(this, void 0, void 0, function* () {
        const uri = history.location.pathname;
        for (const route of routes) {
            const params = matchURI(route.path, uri);
            if (!params) {
                continue;
            }
            const result = yield route.action(params);
            return result;
        }
        return noMatch();
    });
}
exports.resolve = resolve;
//# sourceMappingURL=routing.js.map