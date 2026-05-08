import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina múltiples clases de Tailwind y resuelve conflictos usando tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resuelve la ruta de un recurso estático basándose en el basePath de la aplicación.
 */
export function getAssetPath(path: string) {
  const basePath = '/web'; // Debe coincidir con next.config.ts
  if (path.startsWith('http') || path.startsWith('//')) return path;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
