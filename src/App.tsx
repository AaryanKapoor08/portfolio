import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Index from "./pages/Index.tsx";
import Research from "./pages/Research.tsx";
import NotFound from "./pages/NotFound.tsx";

// Client-side navigation keeps the old scroll offset; reset it on page change
// unless we're heading to a "/#section" anchor (Index scrolls to that itself).
const ScrollOnRouteChange = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    <Sonner />
    <BrowserRouter>
      <ScrollOnRouteChange />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/research" element={<Research />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </NextThemesProvider>
);

export default App;
