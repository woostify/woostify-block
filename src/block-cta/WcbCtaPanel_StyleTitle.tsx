import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import React, { FC } from "react";
import MyTypographyControl from "../components/controls/MyTypographyControl/MyTypographyControl";
import {
	MyTypographyControlData,
	TYPOGRAPHY_CONTROL_DEMO,
} from "../components/controls/MyTypographyControl/types";
import MyDisclosure from "../components/controls/MyDisclosure";
import MyUnitControl from "../components/controls/MyUnitControl";
import { MY_GAP_UNITS } from "../components/controls/MyDimensionsControl/MyDimensionsControl";
import { HasResponsive } from "../components/controls/MyBackgroundControl/types";
import { ResponsiveDevices } from "../components/controls/MyResponsiveToggle/MyResponsiveToggle";
import useGetDeviceType from "../hooks/useGetDeviceType";
import MyColorPicker from "../components/controls/MyColorPicker/MyColorPicker";

export interface WCB_CTA_PANEL_STYLE_TITLE {
	typography: MyTypographyControlData;
	textColor: string;
	marginBottom: HasResponsive<string>;
}

export const WCB_CTA_PANEL_STYLE_TITLE_DEMO: WCB_CTA_PANEL_STYLE_TITLE = {
	typography: {
		...TYPOGRAPHY_CONTROL_DEMO,
		fontSizes: { Desktop: "2.25rem" },
		appearance: {
			...TYPOGRAPHY_CONTROL_DEMO.appearance,
			style: {
				...TYPOGRAPHY_CONTROL_DEMO.appearance.style,
				fontWeight: "500",
			},
		},
	},
	textColor: "#171717",
	marginBottom: { Desktop: "1.5rem" },
};

interface Props
	extends Pick<PanelBody.Props, "onToggle" | "opened" | "initialOpen"> {
	panelData: WCB_CTA_PANEL_STYLE_TITLE;
	setAttr__: (data: WCB_CTA_PANEL_STYLE_TITLE) => void;
}

const WcbCtaPanel_StyleTitle: FC<Props> = ({
	panelData = WCB_CTA_PANEL_STYLE_TITLE_DEMO,
	setAttr__,
	initialOpen,
	onToggle,
	opened,
}) => {
	const deviceType: ResponsiveDevices = useGetDeviceType() || "Desktop";
	const { typography, textColor, marginBottom } = panelData;
	const MARGIN_BOTTOM =
		marginBottom[deviceType] || marginBottom.Tablet || marginBottom.Desktop;
	//
	return (
		<PanelBody
			initialOpen={initialOpen}
			onToggle={onToggle}
			opened={opened}
			title={__("Title", "wcb")}
		>
			<div className="space-y-2.5">
				<MyTypographyControl
					typographyControl={typography}
					setAttrs__typography={(typography) => {
						setAttr__({
							...panelData,
							typography,
						});
					}}
				/>

				<MyDisclosure defaultOpen label="More styles">
					<MyColorPicker
						onChange={(color) => {
							setAttr__({
								...panelData,
								textColor: color,
							});
						}}
						color={textColor}
					/>

					<MyUnitControl
						onChange={(value) => {
							setAttr__({
								...panelData,
								marginBottom: {
									...marginBottom,
									[deviceType]: value,
								},
							});
						}}
						value={MARGIN_BOTTOM}
						units={MY_GAP_UNITS}
						label={__("Margin bottom", "wcb")}
						hasResponsive
						className="flex-col space-y-2"
					/>
				</MyDisclosure>
			</div>
		</PanelBody>
	);
};

export default WcbCtaPanel_StyleTitle;
