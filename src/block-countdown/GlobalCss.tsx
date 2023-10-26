import { Global, CSSObject } from "@emotion/react";
import React, { FC, CSSProperties } from "react";
import { getAdvanveDivWrapStyles } from "../block-container/getAdvanveStyles";
import { HasResponsive } from "../components/controls/MyBackgroundControl/types";
import getPaddingMarginStyles from "../utils/getPaddingMarginStyles";
import getStyleObjectFromResponsiveAttr from "../utils/getStyleObjectFromResponsiveAttr";
import getTypographyStyles from "../utils/getTypographyStyles";
import getValueFromAttrsResponsives from "../utils/getValueFromAttrsResponsives";
import getBorderStyles from "../utils/getBorderStyles";
import { DEMO_WCB_GLOBAL_VARIABLES } from "../________";
import { WcbAttrsForSave } from "./Save";

interface Props extends WcbAttrsForSave {}

const GlobalCss: FC<Props> = (attrs) => {
	const {
		uniqueId,
		// ATTRS OF BLOCK
		general_layout,
		general_icon,
		style_description,
		style_Icon,
		style_dimension,
		style_label,
		//
		advance_responsiveCondition,
		advance_zIndex,
		advance_motionEffect,
	} = attrs;
	const { media_desktop, media_tablet } = DEMO_WCB_GLOBAL_VARIABLES;

	const WRAP_CLASSNAME = `.${uniqueId}[data-uniqueid=${uniqueId}]`;
	const INNER_CLASSNAME = `${WRAP_CLASSNAME} .wcb-countdown__inner`;
	const CONTENT_CLASSNAME = `${WRAP_CLASSNAME} .wcb-countdown__content`;
	const LABEL_CLASSNAME = `${WRAP_CLASSNAME} .wcb-countdown__label`;
	const BOX_CLASSNAME = `${WRAP_CLASSNAME} .wcb-countdown__box`;

	// ------------------- WRAP DIV
	const getDivWrapStyles = (): CSSObject => {
		return {
			[`${WRAP_CLASSNAME}`]: {
				[`@media (min-width: ${media_tablet})`]: {},
				[`@media (min-width: ${media_desktop})`]: {},
			},
		};
	};

	const {
		value_Desktop: textAlignment_Desktop,
		value_Tablet: textAlignment_tablet,
		value_Mobile: textAlignment_mobile,
	} = getValueFromAttrsResponsives(general_layout.textAlignment);
	const {
		value_Desktop: flexDirection_Desktop,
		value_Tablet: flexDirection_tablet,
		value_Mobile: flexDirection_mobile,
	} = getValueFromAttrsResponsives(general_layout.flexDirection);
	// FLEX COL
	let ALIGN_ITEMS: HasResponsive<CSSProperties["alignItems"]> = {
		Desktop:
			textAlignment_Desktop === "left"
				? "start"
				: textAlignment_Desktop === "right"
				? "end"
				: "center",
		Tablet:
			textAlignment_tablet === "left"
				? "start"
				: textAlignment_tablet === "right"
				? "end"
				: "center",
		Mobile:
			textAlignment_mobile === "left"
				? "start"
				: textAlignment_mobile === "right"
				? "end"
				: "center",
	};

	if (
		flexDirection_Desktop === "row" ||
		flexDirection_Desktop === "row-reverse"
	) {
		ALIGN_ITEMS.Desktop = "center";
	}
	if (
		flexDirection_tablet === "row" ||
		flexDirection_tablet === "row-reverse"
	) {
		ALIGN_ITEMS.Tablet = "center";
	}
	if (
		flexDirection_mobile === "row" ||
		flexDirection_mobile === "row-reverse"
	) {
		ALIGN_ITEMS.Mobile = "center";
	}

	if (!uniqueId) {
		return null;
	}
	return (
		<>
			{ <Global styles={getDivWrapStyles()} /> }

			{/* INNER  */}
			<Global
				styles={[
					getStyleObjectFromResponsiveAttr({
						className: CONTENT_CLASSNAME,
						value: general_layout.textAlignment,
						prefix: "textAlign",
					}),

					getStyleObjectFromResponsiveAttr({
						className: CONTENT_CLASSNAME,
						value: ALIGN_ITEMS,
						prefix: "alignItems",
					}),

					getStyleObjectFromResponsiveAttr({
						className: CONTENT_CLASSNAME,
						value: general_layout.flexDirection,
						prefix: "flexDirection",
					}),
				]}
			/>

			<Global
				styles={getStyleObjectFromResponsiveAttr({
					className: BOX_CLASSNAME,
					value: general_layout.contentWidth,
					prefix: "width",
				})}
			/>

			{/* ADVANCE  */}
			<Global
				styles={getAdvanveDivWrapStyles({
					advance_motionEffect,
					advance_responsiveCondition,
					advance_zIndex,
					className: WRAP_CLASSNAME,
					defaultDisplay: "block",
				})}
			/>
		</>
	);
};

export default React.memo(GlobalCss);
