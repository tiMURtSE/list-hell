import { createContext } from "react";
import { IContext } from "../types";

export const TabContext = createContext<IContext | null>(null);
