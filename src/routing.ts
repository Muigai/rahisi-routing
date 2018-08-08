import { createBrowserHistory, createHashHistory } from "history";
import pathToRegexp = require("path-to-regexp");
import { BaseElement, ConditionalRenderElement, OnHandlerA, R, React, Renderable } from "rahisi";
import { F1 } from "rahisi-type-utils";

const history = createBrowserHistory();

export const Link = (props: R.AnchorHTMLAttributes<HTMLAnchorElement>, children: any) => {
  const attributes = React.getAttributes(props as any);
  const kids = React.getChildren(children);
  attributes.push(
    new OnHandlerA("click",
      (event) => {
        event.preventDefault();
        history.push({
          pathname: (event.currentTarget as HTMLAnchorElement).pathname,
          search: (event.currentTarget as HTMLAnchorElement).search,
        });
      }));
  return new BaseElement("a", attributes, kids) as any;
};

function matchURI(path: string, uri: string) {
  const keys: pathToRegexp.Key[] = [];
  const pattern = pathToRegexp(path, keys);
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
  const uri = history.location.pathname;
  const params = matchURI(route.path, uri);
  return params;
}

export const Switch = (routes: Route[], noMatch: Renderable) => {

  const test =
    routes.map(
      (a) => {
        return {
          test: () => resolve(a) != null,
          renderable: () => resolve(a) ? a.action(resolve(a)!) : noMatch,
        };
      },
    );

  return new ConditionalRenderElement(test, noMatch);
};
