import { defineConfig } from 'astro/config';
import sanity from "@sanity/astro";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    sanity({
      projectId: 'xr5j5141', // Asegúrate de que tu ID sigue aquí
      dataset: 'production',
      useCdn: false,
    }),
    icon()
  ]
});