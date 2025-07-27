export type ExtensionData = {
  id: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

export type ColorScheme = "dark" | "light";

export class GlobalState {
  colorScheme: ColorScheme = $state("light");
  extensions: ExtensionData[] = $state([]);

  async populateExtensions(): Promise<void> {
    const resp = await fetch("/data.json");
    if (!resp.ok) {
      throw new Error("Failed to get extensions");
    }

    const data: ExtensionData[] = await resp.json();

    globalState.extensions = data;
  }

  removeExtension(id: number): void {
    globalState.extensions = globalState.extensions.filter(
      (extension) => extension.id !== id
    );
  }

  setExtensionStatus(id: number, isActive: boolean): void {
    this.extensions.find((extension) => extension.id === id)!.isActive =
      isActive;
  }
}

export let globalState = new GlobalState();
