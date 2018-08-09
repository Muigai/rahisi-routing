import { ConditionalRenderElement, R, Renderable } from "rahisi";
import { F0, F1 } from "rahisi-type-utils";
export declare const Link: (props: R.AnchorHTMLAttributes<HTMLAnchorElement>, children: any) => any;
export interface Route {
    path: string;
    action: F1<Map<string | number, string>, Renderable>;
}
export declare function resolve(route: Route): Map<string | number, string> | null;
export declare const Switch: (routes: Route[], noMatch: F0<Renderable>) => ConditionalRenderElement;
