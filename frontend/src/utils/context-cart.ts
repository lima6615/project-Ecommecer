import { createContext } from "react";

export type contextCartCountType = {
    contextCartCount: number;
    setContextCartCount: (contextCartCount: number) => void;
}

export const ContextCartCount = createContext<contextCartCountType>({
    contextCartCount: 0,
    setContextCartCount: () => {}
})