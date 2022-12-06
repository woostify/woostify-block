import React, { FC } from "react";
import ReactDOM from "react-dom";
import { WcbAttrs } from "./attributes";
import GlobalCss from "./GlobalCss";
import { WcbAttrsForSave } from "./Save";
import useGlide from "./useGlide";

interface Props extends WcbAttrsForSave {}

const FrontendStyles: FC<Props> = (attrs) => {
	const { general_carousel, general_general, uniqueId } = attrs;
	useGlide({ general_carousel, general_general, UNIQUE_ID: uniqueId });

	return <GlobalCss {...attrs} />;
};

//
const divsToUpdate = document.querySelectorAll(
	".wcb-testimonials__wrap.wcb-update-div"
);
divsToUpdate.forEach((div) => {
	const preEl = div.querySelector(
		`pre[data-wcb-block-attrs=${div.id}]`
	) as HTMLElement | null;

	const divRenderCssEl = div.querySelector(
		`div[data-wcb-global-styles=${div.id}]`
	) as HTMLElement | null;

	if (!preEl || !preEl.innerText || !divRenderCssEl) {
		return;
	}
	//
	const props = JSON.parse(preEl?.innerText);
	//
	ReactDOM.render(<FrontendStyles {...props} />, divRenderCssEl);
	//
	div.classList.remove("wcb-update-div");
	preEl.remove();
});
