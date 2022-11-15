import {
	PanelBody,
	SelectControl,
	ToggleControl,
	// @ts-ignore
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React, { FC, CSSProperties } from "react";
import { MyInputAutocomplete } from "./types";

export interface WCB_EMAIL_PANEL_GENERAL {
	autocomplete: MyInputAutocomplete;
	placeholder: string;
	isRequired: boolean;
}

export const WCB_EMAIL_PANEL_GENERAL_DEMO: WCB_EMAIL_PANEL_GENERAL = {
	autocomplete: "email",
	isRequired: true,
	placeholder: "john@example.com",
};

interface Props
	extends Pick<PanelBody.Props, "onToggle" | "opened" | "initialOpen"> {
	panelData: WCB_EMAIL_PANEL_GENERAL;
	setAttr__: (data: WCB_EMAIL_PANEL_GENERAL) => void;
}

const WcbEmailPanelGeneral: FC<Props> = ({
	panelData = WCB_EMAIL_PANEL_GENERAL_DEMO,
	setAttr__,
	initialOpen,
	onToggle,
	opened,
}) => {
	const { autocomplete, isRequired, placeholder } = panelData;

	return (
		<PanelBody
			initialOpen={initialOpen}
			onToggle={onToggle}
			opened={opened}
			title={__("General", "wcb")}
		>
			<div className={"space-y-5"}>
				<SelectControl
					label={__("Autocomplete", "wcb")}
					value={autocomplete}
					onChange={(selection) => {
						setAttr__({
							...panelData,
							autocomplete: selection,
						});
					}}
					// @ts-ignore
					__nextHasNoMarginBottom
				>
					<option value="off">{__("Off", "wcb")}</option>
					<option value="email">{__("Email", "wcb")}</option>
				</SelectControl>

				<InputControl
					label={__("PLACEHOLDER", "wcb")}
					value={placeholder}
					onChange={(nextValue) => {
						setAttr__({ ...panelData, placeholder: nextValue });
					}}
				/>

				<ToggleControl
					label={__("Required", "wcb")}
					checked={isRequired}
					onChange={(isChecked) => {
						setAttr__({ ...panelData, isRequired: isChecked });
					}}
				/>
			</div>
		</PanelBody>
	);
};

export default WcbEmailPanelGeneral;
