import type { ExtensionData } from "./types";

export type ColorScheme = "dark" | "light";

export let colorScheme: ColorScheme = $state("light");
let extensions: ExtensionData[] = $state([]);

export function getExtensions(): ExtensionData[] {
  return extensions;
}

export async function populateExtensions(): Promise<void> {
  const resp = await fetch("/data.json");
  if (!resp.ok) {
    throw new Error("Failed to get extensions");
  }

  const data: ExtensionData[] = await resp.json();

  extensions = data;
}

export function setExtensionStatus(id: number, status: boolean): void {
  extensions.find((extension) => extension.id == id)!.isActive = status;
}
