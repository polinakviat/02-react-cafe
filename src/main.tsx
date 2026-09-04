import { createRoot } from "react-dom/client";  
import { index,css } from "./index.css";
import App from "./components/App/App";

createRoot(document.getElementById("root") as HTMLElement).render(App);