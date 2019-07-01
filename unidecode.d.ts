declare function unidecode(str: string, options?: UnidecodeOptions): string;

declare module 'unidecode' {
	export function resolveSpacing(str: string): string;
}

export interface UnidecodeOptions {
	deferredSmartSpacing?: boolean;
	german?: boolean;
	skipRanges?: [number, number][];
	smartSpacing?: boolean;
}
