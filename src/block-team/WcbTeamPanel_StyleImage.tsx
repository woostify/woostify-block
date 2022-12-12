import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	// @ts-ignore
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";
// @ts-ignore
import { __experimentalBorderRadiusControl as BorderRadiusControl } from "@wordpress/block-editor";
import React, { FC } from "react";
import { HasResponsive } from "../components/controls/MyBackgroundControl/types";
import { DimensionSettings } from "../components/controls/MyDimensionsControl/types";
import MyLabelControl from "../components/controls/MyLabelControl/MyLabelControl";
import { ResponsiveDevices } from "../components/controls/MyResponsiveToggle/MyResponsiveToggle";
import useGetDeviceType from "../hooks/useGetDeviceType";
import getValueFromAttrsResponsives from "../utils/getValueFromAttrsResponsives";
import MySpacingSizesControl from "../components/controls/MySpacingSizesControl/MySpacingSizesControl";
import {
	BorderRadiusSettings,
	MyBorderControlData,
	MY_BORDER_CONTROL_DEMO,
} from "../components/controls/MyBorderControl/types";
import MyBorderControl from "../components/controls/MyBorderControl/MyBorderControl";
import MyDisclosure from "../components/controls/MyDisclosure";

export interface WCB_TEAM_PANEL_STYLE_IMAGE {
	padding: HasResponsive<DimensionSettings>;
	imageSize: HasResponsive<string>;
	border: MyBorderControlData;
}
export const WCB_TEAM_PANEL_STYLE_IMAGE_DEMO: WCB_TEAM_PANEL_STYLE_IMAGE = {
	padding: {
		Desktop: {
			top: "0.5rem",
			left: "1rem",
			right: "1rem",
			bottom: "0.5rem",
		},
	},
	imageSize: {
		Desktop: "3.5rem",
	},
	border: MY_BORDER_CONTROL_DEMO,
};

interface Props
	extends Pick<PanelBody.Props, "onToggle" | "opened" | "initialOpen"> {
	panelData: WCB_TEAM_PANEL_STYLE_IMAGE;
	setAttr__: (data: WCB_TEAM_PANEL_STYLE_IMAGE) => void;
}

const WcbTeamPanel_StyleImage: FC<Props> = ({
	panelData = WCB_TEAM_PANEL_STYLE_IMAGE_DEMO,
	setAttr__,
	initialOpen,
	onToggle,
	opened,
}) => {
	const deviceType: ResponsiveDevices = useGetDeviceType() || "Desktop";
	const { padding, imageSize, border } = panelData;
	const { currentDeviceValue: currentPadding } = getValueFromAttrsResponsives(
		padding,
		deviceType
	);

	const { currentDeviceValue: currentImageSize } = getValueFromAttrsResponsives(
		imageSize,
		deviceType
	);

	//
	return (
		<PanelBody
			initialOpen={initialOpen}
			onToggle={onToggle}
			opened={opened}
			title={__("Image", "wcb")}
		>
			<div className="space-y-5">
				<MySpacingSizesControl
					onChange={(value) => {
						setAttr__({
							...panelData,
							imageSize: {
								...imageSize,
								[deviceType]: value,
							},
						});
					}}
					value={currentImageSize || "2rem"}
					hasResponsive
					label={__("Image size", "wcb")}
				/>

				<BoxControl
					label={
						<MyLabelControl className="" hasResponsive>
							{__("Padding", "wcb")}
						</MyLabelControl>
					}
					values={currentPadding}
					onChange={(value: DimensionSettings) => {
						setAttr__({
							...panelData,
							padding: {
								...padding,
								[deviceType]: value,
							},
						});
					}}
				/>

				<MyDisclosure label={__("Border", "wcb")} defaultOpen>
					<MyBorderControl
						borderControl={border}
						setAttrs__border={(data) => {
							setAttr__({ ...panelData, border: data });
						}}
					/>
				</MyDisclosure>
			</div>
		</PanelBody>
	);
};

export default WcbTeamPanel_StyleImage;
