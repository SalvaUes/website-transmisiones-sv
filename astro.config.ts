import { defineConfig } from 'astro/config';
import sanity from "@sanity/astro";
import icon from "astro-icon";

import react from '@astrojs/react';

export default defineConfig({
  // ---> AÑADE ESTA SECCIÓN COMPLETA <---
  build: {
    format: 'file'
  },
  server: {
    host: 'localhost',
    port: 4321
  },
  vite: {
    server: {
      host: 'localhost',
      port: 4321,
      strictPort: true
    }
  },
  integrations: [sanity({
    projectId: 'xr5j5141', // Asegúrate de que tu ID sigue aquí
    dataset: 'production',
    useCdn: false,
  }), icon(), react()]
});