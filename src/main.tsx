// import this BEFORE react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom"
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

/*import { scan } from "react-scan";

if (typeof window !== "undefined") {
	scan({
		enabled: true,
		log: true, // logs render info to console (default: false)
	});
}*/
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<App/>
				<Toaster/>
			</ThemeProvider>
		</Router>
	</StrictMode>
);
