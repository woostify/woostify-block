import React from "react";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import { WcbAttrs } from "./attributes";
import SaveCommon from "../components/SaveCommon";
import "./style.scss";

export interface WcbAttrsForSave
	extends Omit<WcbAttrs, "title" | "description" | "general_preset"> {}

export default function save({ attributes }: { attributes: WcbAttrs }) {
	const {
		uniqueId,
		advance_responsiveCondition,
		advance_zIndex,
		description,
		general_layout,
		style_description,
		style_dimension,
		style_title,
		title,
		className,
	} = attributes;
	//
	console.log(111, { attributes });

	const newAttrForSave: WcbAttrsForSave = {
		uniqueId,
		advance_responsiveCondition,
		advance_zIndex,
		general_layout,
		style_description,
		style_dimension,
		style_title,
	};
	//
	const blockProps = useBlockProps.save({ className: "wcb-cta__wrap" });

	return (
		<SaveCommon
			attributes={newAttrForSave}
			className={"wcb-cta__wrap" + ` ${attributes.className || ""}`}
			uniqueId={uniqueId}
			{...blockProps}
		>
			<div className="wcb-cta__inner">
				<div className="wcb-cta__content">
					<RichText.Content
						tagName={attributes.general_layout.headingTag}
						value={attributes.title}
						className="wcb-cta__title"
					/>
					<RichText.Content
						tagName="p"
						value={attributes.description}
						className="wcb-cta__description"
					/>
				</div>
				<div className="wcb-cta__buttons">
					<InnerBlocks.Content />
				</div>
			</div>
		</SaveCommon>
	);
}
