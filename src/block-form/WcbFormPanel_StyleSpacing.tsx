import {
	ColorPicker,
	PanelBody,
	// @ts-ignore
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React, { FC, CSSProperties } from "react";
import { HasResponsive } from "../components/controls/MyBackgroundControl/types";
import {
	MyBorderControlData,
	MY_BORDER_CONTROL_DEMO,
} from "../components/controls/MyBorderControl/types";
import MyColorPicker from "../components/controls/MyColorPicker/MyColorPicker";
import { DimensionSettings } from "../components/controls/MyDimensionsControl/types";
import MyDisclosure from "../components/controls/MyDisclosure";
import MyLabelControl from "../components/controls/MyLabelControl/MyLabelControl";
import { ResponsiveDevices } from "../components/controls/MyResponsiveToggle/MyResponsiveToggle";
import MySpacingSizesControl from "../components/controls/MySpacingSizesControl/MySpacingSizesControl";
import useGetDeviceType from "../hooks/useGetDeviceType";
import getValueFromAttrsResponsives from "../utils/getValueFromAttrsResponsives";

export interface WCB_FORM_PANEL_STYLE_SPACING {
	padding: HasResponsive<DimensionSettings>;
	border: MyBorderControlData;
	rowGap: HasResponsive<string>;
	labelBottomMargin: HasResponsive<string>;
}

export const WCB_FORM_PANEL_STYLE_SPACING_DEMO: WCB_FORM_PANEL_STYLE_SPACING = {
	padding: {
		Desktop: {
			top: "1rem",
			left: "1rem",
			right: "1rem",
			bottom: "1rem",
		},
	},
	border: MY_BORDER_CONTROL_DEMO,
	rowGap: { Desktop: "1rem" },
	labelBottomMargin: { Desktop: "1rem" },
};

interface Props
	extends Pick<PanelBody.Props, "onToggle" | "opened" | "initialOpen"> {
	panelData: WCB_FORM_PANEL_STYLE_SPACING;
	setAttr__: (data: WCB_FORM_PANEL_STYLE_SPACING) => void;
}

const WcbFormPanel_StyleSpacing: FC<Props> = ({
	panelData = WCB_FORM_PANEL_STYLE_SPACING_DEMO,
	setAttr__,
	initialOpen,
	onToggle,
	opened,
}) => {
	const deviceType: ResponsiveDevices = useGetDeviceType() || "Desktop";
	const {
		border,
		labelBottomMargin: labelBottomMarginProps,
		padding: paddingProps,
		rowGap: rowGapProps,
	} = panelData;
	const { currentDeviceValue: padding } = getValueFromAttrsResponsives(
		paddingProps,
		deviceType
	);
	const { currentDeviceValue: rowGap } = getValueFromAttrsResponsives(
		rowGapProps,
		deviceType
	);
	const { currentDeviceValue: labelBottomMargin } =
		getValueFromAttrsResponsives(labelBottomMarginProps, deviceType);
	return (
		<PanelBody
			initialOpen={initialOpen}
			onToggle={onToggle}
			opened={opened}
			title={__("Spacing", "wcb")}
		>
			<div className={"space-y-5"}>
				<BoxControl
					label={
						<MyLabelControl className="" hasResponsive>
							{__("Form padding", "wcb")}
						</MyLabelControl>
					}
					values={padding}
					onChange={(value: DimensionSettings) => {
						setAttr__({
							...panelData,
							padding: {
								...paddingProps,
								[deviceType]: value,
							},
						});
					}}
				/>

				<MySpacingSizesControl
					value={rowGap || "1rem"}
					hasResponsive
					label={__("Row spacing", "wcb")}
					onChange={(value) => {
						setAttr__({
							...panelData,
							rowGap: {
								...rowGapProps,
								[deviceType]: value,
							},
						});
					}}
				/>

				<MySpacingSizesControl
					value={labelBottomMargin || "1rem"}
					hasResponsive
					label={__("Label margin bottom", "wcb")}
					onChange={(value) => {
						setAttr__({
							...panelData,
							labelBottomMargin: {
								...labelBottomMarginProps,
								[deviceType]: value,
							},
						});
					}}
				/>

				{/* <MyDisclosure defaultOpen label="Color"></MyDisclosure> */}
			</div>
		</PanelBody>
	);
};

export default WcbFormPanel_StyleSpacing;
