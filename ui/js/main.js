import { initDesktop } from "./desktop.js";
import { initWindows } from "./windows.js";
import { initStartMenu } from "./start_menu.js";

document.addEventListener("DOMContentLoaded", () => {
    initStartMenu();
    initDesktop();
    initWindows();
}); 