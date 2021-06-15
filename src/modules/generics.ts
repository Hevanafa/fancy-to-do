export type GenericOnClickEvent = (e: React.MouseEvent) => void;

// https://www.digitalocean.com/community/tutorials/typescript-mixins
function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as any);
		});
	});
}

const getImgSrc = (assetPath: string) =>
	`./assets/img${assetPath}`;

export {
	applyMixins,
	getImgSrc
}