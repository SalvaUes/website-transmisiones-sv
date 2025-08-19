// src/types/sanity.ts
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Transmision {
  _id: string;
  marca: string;
  modelo: string;
  precio: string;
  condicion: string;
  foto: SanityImageSource;
}