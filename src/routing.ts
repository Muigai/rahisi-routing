import pathToRegexp = require("path-to-regexp");
import { BaseElement, ConditionalRenderElement, OnHandlerA, R, React, Renderable } from "rahisi";
import { F0, F1 } from "rahisi-type-utils";

const history = window.history;

export const Link = (props: R.AnchorHTMLAttributes<HTMLAnchorElement>, children: any) => {
  const attributes = React.getAttributes(props);
  const kids = React.getChildren(children);
  attributes.push(
    OnHandlerA.make<HTMLAnchorElement>("click",
      (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        const url = `${target.pathname}${target.search}`;
        history.pushState({}, "", url);
      }));
  return new BaseElement("a", attributes, kids);
};

function matchURI(path: string, uri: string) {
  const keys: pathToRegexp.Key[] = [];
  const pattern = pathToRegexp(path, keys); // cache?
  const match = pattern.exec(uri);
  if (!match) {
    return null;
  }
  const params = new Map<string | number, string>();
  for (let i = 1; i < match.length; i++) {
    if (match[i] !== undefined) {
      params.set(keys[i - 1].name, match[i]);
    }
  }
  return params;
}

export interface Route {
  path: string;
  action: F1<Map<string | number, string>, Renderable>;
}

export function resolve(route: Route) {
  const uri = window.location.pathname;
  const params = matchURI(route.path, uri);
  return params;
}

export const Switch = (routes: Route[], noMatch: F0<Renderable>) => {

  const test =
    routes.map(
      (a) => {
        return {
          test: () => resolve(a) != null,
          renderable: () => resolve(a) ? a.action(resolve(a)!) : noMatch(),
        };
      },
    );

  return new ConditionalRenderElement(test, noMatch);
};
