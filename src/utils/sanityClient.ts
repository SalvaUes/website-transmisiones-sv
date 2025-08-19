// src/utils/sanityClient.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: 'xr5j5141', // El mismo ID que tienes en astro.config.ts
  dataset: 'production',
  apiVersion: '2025-08-18', // La fecha de hoy
  useCdn: false,
});