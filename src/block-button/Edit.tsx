import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import React, { useEffect, FC } from "react";
import { WcbAttrs } from "./attributes";
import HOCInspectorControls, {
	InspectorControlsTabs,
} from "../components/HOCInspectorControls";
import { EditProps } from "../block-container/Edit";
import useCreateCacheEmotion from "../hooks/useCreateCacheEmotion";
import { CacheProvider } from "@emotion/react";
import GlobalCss from "./GlobalCss";
import "./editor.scss";
import useSetBlockPanelInfo from "../hooks/useSetBlockPanelInfo";
import AdvancePanelCommon from "../components/AdvancePanelCommon";
import WcbButtonPanelPreset from "./WcbButtonPanelPreset";
import WcbButtonPanelContent from "./WcbButtonPanelContent";
import WcbButtonPanel_StyleText from "./WcbButtonPanel_StyleText";
import WcbButtonPanel_StyleIcon from "./WcbButtonPanel_StyleIcon";
import WcbButtonPanel_StyleBackground from "./WcbButtonPanel_StyleBackground";
import WcbButtonPanel_StyleBorder from "./WcbButtonPanel_StyleBorder";
import WcbButtonPanel_StyleBoxshadow from "./WcbButtonPanel_StyleBoxshadow";
import WcbButtonPanel_StyleDemension from "./WcbButtonPanel_StyleDimension";

const Edit: FC<EditProps<WcbAttrs>> = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const {
		advance_responsiveCondition,
		advance_zIndex,
		uniqueId,
		general_preset,
		general_content,
		content,
		style_text,
		style_icon,
		style_background,
		style_border,
		style_boxshadow,
		style_dimension,
	} = attributes;
	//  COMMON HOOKS
	const { myCache, ref } = useCreateCacheEmotion();
	const wrapBlockProps = useBlockProps({ ref });
	const {
		tabIsOpen,
		tabAdvancesIsPanelOpen,
		tabGeneralIsPanelOpen,
		tabStylesIsPanelOpen,
		handleTogglePanel,
	} = useSetBlockPanelInfo(uniqueId);

	const UNIQUE_ID = wrapBlockProps.id;
	useEffect(() => {
		setAttributes({
			uniqueId: UNIQUE_ID,
		});
	}, [UNIQUE_ID]);
	//

	const renderTabBodyPanels = (tab: InspectorControlsTabs[number]) => {
		switch (tab.name) {
			case "General":
				return (
					<>
						<WcbButtonPanelPreset
							onToggle={() => handleTogglePanel("General", "Preset", true)}
							initialOpen={
								tabGeneralIsPanelOpen === "Preset" ||
								tabGeneralIsPanelOpen === "first"
							}
							opened={tabGeneralIsPanelOpen === "Preset" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ general_preset: data });
							}}
							panelData={general_preset}
						/>

						<WcbButtonPanelContent
							onToggle={() => handleTogglePanel("General", "Content")}
							initialOpen={tabGeneralIsPanelOpen === "Content"}
							opened={tabGeneralIsPanelOpen === "Content" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ general_content: data });
							}}
							panelData={general_content}
						/>
					</>
				);
			case "Styles":
				return (
					<>
						<WcbButtonPanel_StyleText
							onToggle={() => handleTogglePanel("Styles", "_StyleText", true)}
							initialOpen={
								tabStylesIsPanelOpen === "_StyleText" ||
								tabStylesIsPanelOpen === "first"
							}
							opened={tabStylesIsPanelOpen === "_StyleText" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_text: data });
							}}
							panelData={style_text}
						/>

						<WcbButtonPanel_StyleIcon
							onToggle={() => handleTogglePanel("Styles", "_StyleIcon")}
							initialOpen={tabStylesIsPanelOpen === "_StyleIcon"}
							opened={tabStylesIsPanelOpen === "_StyleIcon" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_icon: data });
							}}
							panelData={style_icon}
						/>

						<WcbButtonPanel_StyleBackground
							onToggle={() => handleTogglePanel("Styles", "_StyleBackground")}
							initialOpen={tabStylesIsPanelOpen === "_StyleBackground"}
							opened={tabStylesIsPanelOpen === "_StyleBackground" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_background: data });
							}}
							panelData={style_background}
						/>

						<WcbButtonPanel_StyleBorder
							onToggle={() => handleTogglePanel("Styles", "_StyleBorder")}
							initialOpen={tabStylesIsPanelOpen === "_StyleBorder"}
							opened={tabStylesIsPanelOpen === "_StyleBorder" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_border: data });
							}}
							panelData={style_border}
						/>

						<WcbButtonPanel_StyleBoxshadow
							onToggle={() => handleTogglePanel("Styles", "_StyleBoxshadow")}
							initialOpen={tabStylesIsPanelOpen === "_StyleBoxshadow"}
							opened={tabStylesIsPanelOpen === "_StyleBoxshadow" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_boxshadow: data });
							}}
							panelData={style_boxshadow}
						/>

						<WcbButtonPanel_StyleDemension
							onToggle={() => handleTogglePanel("Styles", "StyleDemension")}
							initialOpen={tabStylesIsPanelOpen === "StyleDemension"}
							opened={tabStylesIsPanelOpen === "StyleDemension" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_dimension: data });
							}}
							panelData={style_dimension}
						/>
					</>
				);
			case "Advances":
				return (
					<>
						<AdvancePanelCommon
							advance_responsiveCondition={
								attributes.advance_responsiveCondition
							}
							advance_zIndex={attributes.advance_zIndex}
							handleTogglePanel={handleTogglePanel}
							setAttributes={setAttributes}
							tabAdvancesIsPanelOpen={tabAdvancesIsPanelOpen}
						/>
					</>
				);

			default:
				return <div></div>;
		}
	};

	return (
		<CacheProvider value={myCache}>
			<div
				{...wrapBlockProps}
				className={`${wrapBlockProps?.className} wcb-button__wrap ${UNIQUE_ID}`}
				data-uniqueid={UNIQUE_ID}
			>
				{/* CONTROL SETTINGS */}
				<HOCInspectorControls renderTabPanels={renderTabBodyPanels} />

				{/* CSS IN JS */}
				<GlobalCss {...attributes} />

				{/* CHILD CONTENT  */}
				<RichText
					tagName="div"
					className="wcb-button__main"
					value={attributes.content}
					allowedFormats={["core/bold", "core/italic"]}
					onChange={(content) => setAttributes({ content })}
					placeholder={__("Heading...")}
				/>
			</div>
		</CacheProvider>
	);
};

export default Edit;
