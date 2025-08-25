// src/types/sanity.ts
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Transmision {
  _id: string;
  marca: string;
  modelo: string;
  precio: string;
  condicion: string;
  foto: SanityImageSource;
  slug: { current: string }; // <-- Añadido para los enlaces
  descripcion?: string;      // <-- Añadido para la página de detalle
  sku?: string;              // <-- Añadido para la página de detalle
  ano?: number;              // <-- Añadido para la página de detalle
}