import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { routesConfig } from "./app.routes";

export const router = createBrowserRouter(routesConfig as RouteObject[]);
