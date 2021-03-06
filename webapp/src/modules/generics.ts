import React from "react";
import AboutUs from "../Components/AboutUs";

export type GenericOnClickEvent = (e: React.MouseEvent) => void;
export type GenericOnChangeEvent = (e: React.ChangeEvent) => void;

// https://www.digitalocean.com/community/tutorials/typescript-mixins
function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as any);
		});
	});
}

function openLinkDOM(this: AboutUs, e: React.MouseEvent) {
	const link = e.currentTarget.getAttribute("link");
	console.log("AU link:", link);

	if (!link) return false;

	window.open(link, "_system");
	return false;
}

const getImgSrc = (assetPath: string) =>
	`./assets/img${assetPath}`;

export {
	applyMixins,
	getImgSrc,
	openLinkDOM
};
