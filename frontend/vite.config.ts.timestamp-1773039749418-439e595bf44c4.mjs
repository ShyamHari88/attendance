// vite.config.ts
import { defineConfig } from "file:///C:/Users/HP/Downloads/class-connect-main/class-connect-main/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/HP/Downloads/class-connect-main/class-connect-main/frontend/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/HP/Downloads/class-connect-main/class-connect-main/frontend/node_modules/lovable-tagger/dist/index.js";
import { VitePWA } from "file:///C:/Users/HP/Downloads/class-connect-main/class-connect-main/frontend/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\HP\\Downloads\\class-connect-main\\class-connect-main\\frontend";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      strategy: "injectManifest",
      srcDir: "src",
      filename: "service-worker.js",
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["easy-attendance-logo.png", "favicon.ico"],
      manifest: {
        name: "ClassConnect \u2013 Student Portal",
        short_name: "ClassConnect",
        description: "Attendance & Marks Management System",
        theme_color: "#2563eb",
        background_color: "#F8FAFC",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/login",
        icons: [
          {
            src: "easy-attendance-logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "easy-attendance-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        shortcuts: [
          {
            name: "Student Login",
            short_name: "Login",
            url: "/login",
            description: "Go to Login"
          },
          {
            name: "Dashboard",
            short_name: "Dashboard",
            url: "/student-dashboard",
            description: "Go to Student Dashboard"
          }
        ]
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"]
      },
      devOptions: {
        enabled: true,
        type: "module"
        // Required for injectManifest in dev mode
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxEb3dubG9hZHNcXFxcY2xhc3MtY29ubmVjdC1tYWluXFxcXGNsYXNzLWNvbm5lY3QtbWFpblxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRG93bmxvYWRzXFxcXGNsYXNzLWNvbm5lY3QtbWFpblxcXFxjbGFzcy1jb25uZWN0LW1haW5cXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0hQL0Rvd25sb2Fkcy9jbGFzcy1jb25uZWN0LW1haW4vY2xhc3MtY29ubmVjdC1tYWluL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHN0cmF0ZWd5OiAnaW5qZWN0TWFuaWZlc3QnLFxuICAgICAgc3JjRGlyOiAnc3JjJyxcbiAgICAgIGZpbGVuYW1lOiAnc2VydmljZS13b3JrZXIuanMnLFxuICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgICAgIGluamVjdFJlZ2lzdGVyOiAnYXV0bycsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXCJlYXN5LWF0dGVuZGFuY2UtbG9nby5wbmdcIiwgXCJmYXZpY29uLmljb1wiXSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6IFwiQ2xhc3NDb25uZWN0IFx1MjAxMyBTdHVkZW50IFBvcnRhbFwiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIkNsYXNzQ29ubmVjdFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJBdHRlbmRhbmNlICYgTWFya3MgTWFuYWdlbWVudCBTeXN0ZW1cIixcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiIzI1NjNlYlwiLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNGOEZBRkNcIixcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXG4gICAgICAgIHNjb3BlOiBcIi9cIixcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9sb2dpblwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJlYXN5LWF0dGVuZGFuY2UtbG9nby5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImVhc3ktYXR0ZW5kYW5jZS1sb2dvLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55IG1hc2thYmxlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvcnRjdXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJTdHVkZW50IExvZ2luXCIsXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiBcIkxvZ2luXCIsXG4gICAgICAgICAgICB1cmw6IFwiL2xvZ2luXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJHbyB0byBMb2dpblwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgICAgIHNob3J0X25hbWU6IFwiRGFzaGJvYXJkXCIsXG4gICAgICAgICAgICB1cmw6IFwiL3N0dWRlbnQtZGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJHbyB0byBTdHVkZW50IERhc2hib2FyZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgaW5qZWN0TWFuaWZlc3Q6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Zyx3b2ZmMn1cIl0sXG4gICAgICB9LFxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICB0eXBlOiAnbW9kdWxlJywgLy8gUmVxdWlyZWQgZm9yIGluamVjdE1hbmlmZXN0IGluIGRldiBtb2RlXG4gICAgICB9LFxuICAgIH0pLFxuXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRZLFNBQVMsb0JBQW9CO0FBQ3phLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWUsQ0FBQyw0QkFBNEIsYUFBYTtBQUFBLE1BQ3pELFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1Q7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFlBQVk7QUFBQSxZQUNaLEtBQUs7QUFBQSxZQUNMLGFBQWE7QUFBQSxVQUNmO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sWUFBWTtBQUFBLFlBQ1osS0FBSztBQUFBLFlBQ0wsYUFBYTtBQUFBLFVBQ2Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsUUFDZCxjQUFjLENBQUMsc0NBQXNDO0FBQUEsTUFDdkQ7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQTtBQUFBLE1BQ1I7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUVILEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
