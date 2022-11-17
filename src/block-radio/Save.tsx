import React from "react";
import { __ } from "@wordpress/i18n";
// @ts-ignore
import { RichText, useBlockProps } from "@wordpress/block-editor";
import _ from "lodash";
import { WcbAttrs } from "./attributes";
import "./style.scss";
import { FormInputLabelRichTextContent } from "../block-form/FormInputLabelRichTextContent";
import converUniqueId from "../utils/converUniqueId";

export default function save({ attributes }: { attributes: WcbAttrs }) {
	const { uniqueId, general_general } = attributes;
	const RADIO_NAME = converUniqueId(uniqueId, "radio");

	//
	const blockProps = useBlockProps.save({
		className: "wcb-radio__wrap " + RADIO_NAME,
	});

	const renderRadioOptions = () => {
		return (attributes.options || []).map((item) => (
			<div>
				<label className="wcb-radio__option">
					<input
						type="radio"
						className={`wcb-radio__option-input ${general_general.layout}`}
						value={item.value}
						required={general_general.isRequired}
						name={RADIO_NAME}
					/>
					<span className="wcb-radio__option-label">{item.label}</span>
				</label>
			</div>
		));
	};

	return (
		<label {...blockProps} data-uniqueid={uniqueId}>
			<FormInputLabelRichTextContent
				value={attributes.label}
				isRequired={general_general.isRequired}
			/>
			{renderRadioOptions()}
		</label>
	);
}
