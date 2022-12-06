import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import React, { useEffect, FC } from "react";
import { WcbAttrs } from "./attributes";
import HOCInspectorControls, {
	InspectorControlsTabs,
	INSPECTOR_CONTROLS_TABS,
} from "../components/HOCInspectorControls";
import { EditProps } from "../block-container/Edit";
import useCreateCacheEmotion from "../hooks/useCreateCacheEmotion";
import { CacheProvider } from "@emotion/react";
import "./editor.scss";
import useSetBlockPanelInfo from "../hooks/useSetBlockPanelInfo";
import WcbHiddenPanelGeneral from "./WcbHiddenPanelGeneral";
import { FormInputLabelRichText } from "../block-form/FormInputLabelRichText";
import converUniqueId from "../utils/converUniqueId";
import HelpText from "../components/controls/HelpText";

const Edit: FC<EditProps<WcbAttrs>> = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const { general_general, uniqueId } = attributes;
	//  COMMON HOOKS
	// const { myCache, ref } = useCreateCacheEmotion();
	const wrapBlockProps = useBlockProps();
	const {
		tabIsOpen,
		tabAdvancesIsPanelOpen,
		tabGeneralIsPanelOpen,
		tabStylesIsPanelOpen,
		handleTogglePanel,
	} = useSetBlockPanelInfo(uniqueId);

	const UNIQUE_NAME = converUniqueId(uniqueId, "hidden");
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
						<WcbHiddenPanelGeneral
							onToggle={() => handleTogglePanel("General", "General", true)}
							initialOpen={
								tabGeneralIsPanelOpen === "General" ||
								tabGeneralIsPanelOpen === "first"
							}
							opened={tabGeneralIsPanelOpen === "General" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ general_general: data });
							}}
							panelData={general_general}
						/>
					</>
				);
			// case "Styles":
			// 	return <></>;
			case "Advances":
				return <></>;

			default:
				return <div></div>;
		}
	};

	return (
		// <CacheProvider value={myCache}>
		<div
			{...wrapBlockProps}
			className={`${wrapBlockProps?.className} wcb-hidden__wrap p-3 border-2 border-dashed rounded-lg ${UNIQUE_ID}`}
			data-uniqueid={UNIQUE_ID}
		>
			{/* CONTROL SETTINGS */}
			<HOCInspectorControls
				tabs={INSPECTOR_CONTROLS_TABS.filter((item) => item.name !== "Styles")}
				renderTabPanels={renderTabBodyPanels}
			/>

			{/* CHILD CONTENT  */}
			<FormInputLabelRichText
				value={general_general.name}
				isRequired={false}
				onChange={(value) => {
					setAttributes({
						general_general: {
							...general_general,
							name: value,
						},
					});
				}}
			/>
			<input
				type="text"
				placeholder={general_general.value}
				name={UNIQUE_NAME}
			/>
			<HelpText>
				{__("This field will be hidden in the front end.", "wcb")}
			</HelpText>
		</div>
		// </CacheProvider>
	);
};

export default Edit;
