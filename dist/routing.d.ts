import { R } from "rahisi";
import { F0, F1 } from "rahisi-type-utils";
export declare const Link: (props: R.AnchorHTMLAttributes<HTMLAnchorElement>, children: any) => any;
export interface Route<T> {
    path: string;
    action: F1<Map<string | number, string>, T>;
}
export declare function resolve<T>(routes: Array<Route<T>>, noMatch: F0<T>): T;
