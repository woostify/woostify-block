import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	// @ts-ignore
	useInnerBlocksProps,
	// @ts-ignore
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
	RichText,
} from "@wordpress/block-editor";
import { get } from "lodash";
import { PanelBody } from "@wordpress/components";
import { useInstanceId } from "@wordpress/compose";
import React, { useEffect, FC } from "react";
import { WcbAttrs } from "./attributes";
import HOCInspectorControls, {
	InspectorControlsTabs,
} from "../components/HOCInspectorControls";
import { EditProps, TPlaceholder } from "../block-container/Edit";
import useCreateCacheEmotion from "../hooks/useCreateCacheEmotion";
import { CacheProvider } from "@emotion/react";
import GlobalCss from "./GlobalCss";
import "./editor.scss";
import useSetBlockPanelInfo from "../hooks/useSetBlockPanelInfo";
import AdvancePanelCommon from "../components/AdvancePanelCommon";
import WcbFormPanelGeneral from "./WcbFormPanelGeneral";
import { useSelect, useDispatch } from "@wordpress/data";
import {
	// @ts-ignore
	createBlocksFromInnerBlocksTemplate,
	// @ts-ignore
	store as blocksStore,
} from "@wordpress/blocks";
import WcbFormPanelSubmitButton from "./WcbFormPanelSubmitButton";
import WcbFormPanelAction from "./WcbFormPanelAction";
import WcbFormPanelGoogleRecaptcha from "./WcbFormPanelGoogleRecaptcha";
import WcbFormPanel_StyleLabel from "./WcbFormPanel_StyleLabel";
import WcbFormPanel_StyleInput, {
	WCB_FORM_PANEL_STYLE_INPUT_DEMO__SIMPLE,
	WCB_FORM_PANEL_STYLE_INPUT_DEMO__SOLID,
	WCB_FORM_PANEL_STYLE_INPUT_DEMO__UNDERLINE,
} from "./WcbFormPanel_StyleInput";
import WcbFormPanel_StyleCheckBoxRadio, {
	WCB_FORM_PANEL_STYLE_CHECKBOX_RADIO_TOGGLE_DEMO__SIMPLE,
	WCB_FORM_PANEL_STYLE_CHECKBOX_RADIO_TOGGLE_DEMO__SOLID,
} from "./WcbFormPanel_StyleCheckBoxRadio";
import WcbPostGridPanel_StyleSubmitButton from "./WcbPostGridPanel_StyleSubmitButton";
import WcbPostGridPanel_StyleMessages from "./WcbPostGridPanel_StyleMessages";
import WcbFormPanel_StyleSpacing from "./WcbFormPanel_StyleSpacing";
import HelpText from "../components/controls/HelpText";

export type FormChildAllowed =
	| "wcb/input"
	| "wcb/email"
	| "wcb/phone"
	| "wcb/textarea"
	| "wcb/toggle"
	| "wcb/checkbox"
	| "wcb/radio"
	| "wcb/password"
	| "wcb/select"
	| "wcb/url"
	| "wcb/hidden"
	| "wcb/date"
	| "wcb/accept";

const Edit: FC<EditProps<WcbAttrs>> = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const {
		advance_responsiveCondition,
		advance_zIndex,
		general_general,
		uniqueId,
		general_submit_button,
		general_action,
		general_gg_recaptcha,
		style_label,
		style_input,
		style_checkbox_radio_toggle,
		style_submit_button,
		style_messages,
		style_spacing,
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
	useEffect(() => {
		console.log(111111);

		if (general_general.formStyle === "simple") {
			setAttributes({
				style_input: WCB_FORM_PANEL_STYLE_INPUT_DEMO__SIMPLE,
				style_checkbox_radio_toggle:
					WCB_FORM_PANEL_STYLE_CHECKBOX_RADIO_TOGGLE_DEMO__SIMPLE,
			});
		}
		if (general_general.formStyle === "solid") {
			setAttributes({
				style_input: WCB_FORM_PANEL_STYLE_INPUT_DEMO__SOLID,
				style_checkbox_radio_toggle:
					WCB_FORM_PANEL_STYLE_CHECKBOX_RADIO_TOGGLE_DEMO__SOLID,
			});
		}
		if (general_general.formStyle === "underline") {
			setAttributes({
				style_input: WCB_FORM_PANEL_STYLE_INPUT_DEMO__UNDERLINE,
				style_checkbox_radio_toggle:
					WCB_FORM_PANEL_STYLE_CHECKBOX_RADIO_TOGGLE_DEMO__SIMPLE,
			});
		}
	}, [general_general.formStyle]);
	//

	const renderTabBodyPanels = (tab: InspectorControlsTabs[number]) => {
		switch (tab.name) {
			case "General":
				return (
					<>
						<WcbFormPanelGeneral
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

						<WcbFormPanelSubmitButton
							onToggle={() => handleTogglePanel("General", "SubmitButton")}
							initialOpen={tabGeneralIsPanelOpen === "SubmitButton"}
							opened={tabGeneralIsPanelOpen === "SubmitButton" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ general_submit_button: data });
							}}
							panelData={general_submit_button}
						/>

						<WcbFormPanelAction
							onToggle={() => handleTogglePanel("General", "Action")}
							initialOpen={tabGeneralIsPanelOpen === "Action"}
							opened={tabGeneralIsPanelOpen === "Action" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ general_action: data });
							}}
							panelData={general_action}
						/>

						<WcbFormPanelGoogleRecaptcha
							onToggle={() => handleTogglePanel("General", "GoogleRecaptcha")}
							initialOpen={tabGeneralIsPanelOpen === "GoogleRecaptcha"}
							opened={tabGeneralIsPanelOpen === "GoogleRecaptcha" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ general_gg_recaptcha: data });
							}}
							panelData={general_gg_recaptcha}
						/>
					</>
				);
			case "Styles":
				return (
					<>
						<WcbFormPanel_StyleLabel
							onToggle={() => handleTogglePanel("Styles", "_StyleLabel", true)}
							initialOpen={
								tabStylesIsPanelOpen === "_StyleLabel" ||
								tabStylesIsPanelOpen === "first"
							}
							opened={tabStylesIsPanelOpen === "_StyleLabel" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_label: data });
							}}
							panelData={style_label}
						/>

						<WcbFormPanel_StyleInput
							onToggle={() => handleTogglePanel("Styles", "_StyleInput")}
							initialOpen={tabStylesIsPanelOpen === "_StyleInput"}
							opened={tabStylesIsPanelOpen === "_StyleInput" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_input: data });
							}}
							panelData={style_input}
						/>

						<WcbFormPanel_StyleCheckBoxRadio
							onToggle={() =>
								handleTogglePanel("Styles", "_StyleCheckBoxRadio")
							}
							initialOpen={tabStylesIsPanelOpen === "_StyleCheckBoxRadio"}
							opened={
								tabStylesIsPanelOpen === "_StyleCheckBoxRadio" || undefined
							}
							//
							setAttr__={(data) => {
								setAttributes({ style_checkbox_radio_toggle: data });
							}}
							panelData={style_checkbox_radio_toggle}
						/>

						<WcbPostGridPanel_StyleSubmitButton
							onToggle={() => handleTogglePanel("Styles", "_StyleSubmitButton")}
							initialOpen={tabStylesIsPanelOpen === "_StyleSubmitButton"}
							opened={
								tabStylesIsPanelOpen === "_StyleSubmitButton" || undefined
							}
							//
							setAttr__={(data) => {
								setAttributes({ style_submit_button: data });
							}}
							panelData={style_submit_button}
						/>

						<WcbPostGridPanel_StyleMessages
							onToggle={() => handleTogglePanel("Styles", "_StyleMessages")}
							initialOpen={tabStylesIsPanelOpen === "_StyleMessages"}
							opened={tabStylesIsPanelOpen === "_StyleMessages" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_messages: data });
							}}
							panelData={style_messages}
						/>

						<WcbFormPanel_StyleSpacing
							onToggle={() => handleTogglePanel("Styles", "_StyleSpacing")}
							initialOpen={tabStylesIsPanelOpen === "_StyleSpacing"}
							opened={tabStylesIsPanelOpen === "_StyleSpacing" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({ style_spacing: data });
							}}
							panelData={style_spacing}
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

	const {} = attributes;
	const ALLOWED_BLOCKS: FormChildAllowed[] = [
		"wcb/input",
		"wcb/email",
		"wcb/phone",
		"wcb/textarea",
		"wcb/toggle",
		"wcb/checkbox",
		"wcb/radio",
		"wcb/password",
		"wcb/select",
		"wcb/url",
		"wcb/hidden",
		"wcb/date",
		"wcb/accept",
	];

	const blockProps = useBlockProps({
		className: `wcb-form__inner`,
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: () => null,
	});
	//

	return (
		<CacheProvider value={myCache}>
			<form
				{...wrapBlockProps}
				className={`wcb-form__wrap ${uniqueId} ${wrapBlockProps.className} `}
				// id={uniqueId}
				data-uniqueid={uniqueId}
			>
				{/*  */}
				<GlobalCss {...attributes} />
				{/*  */}

				<div {...innerBlocksProps} name={useInstanceId(Edit)} />
				<div className="wcb-form__btn-submit-wrap">
					<RichText
						className="wcb-form__btn-submit"
						tagName="div" // The tag here is the element output and editable in the admin
						value={attributes.btnSubmitText} // Any existing content, either from the database or an attribute default
						allowedFormats={["core/bold", "core/italic"]} // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={(content) => setAttributes({ btnSubmitText: content })} // Store updated content as a block attribute
						placeholder={__("Submit", "wcb")} // Display this text before any content has been added by the user
					/>
				</div>
				<div>
					<div className="wcb-form__successMessageText">
						<span>{attributes.general_general.successMessageText}</span>
					</div>
					<HelpText>
						{__(
							"(Success message: Only show on the frontend when the form submit is successful.)",
							"wcb"
						)}
					</HelpText>
				</div>
				<div>
					<div className="wcb-form__errorMessageText">
						<span>{attributes.general_general.errorMessageText}</span>
					</div>
					<HelpText>
						{__(
							"(Error message: Only show on the frontend when the form submit is error.)",
							"wcb"
						)}
					</HelpText>
				</div>

				<HOCInspectorControls
					uniqueId={uniqueId}
					renderTabPanels={renderTabBodyPanels}
					onChangeActive={(tab) => {
						handleTogglePanel(tab);
					}}
					tabDefaultActive={tabIsOpen}
				/>
			</form>
		</CacheProvider>
	);
};

const Placeholder: FC<TPlaceholder> = ({
	attributes,
	setAttributes,
	name,
	clientId,
}) => {
	useEffect(() => {}, []);

	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const { getBlockVariations, getBlockType, getDefaultBlockVariation } =
				select(blocksStore) as any;

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, "block"),
				variations: getBlockVariations(name, "block"),
			};
		},
		[name]
	);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	return (
		<div {...useBlockProps()}>
			<BlockVariationPicker
				icon={get(blockType, ["icon", "src"])}
				label={get(blockType, ["title"])}
				instructions={__("Select a variation to start with.")}
				onSelect={(nextVariation = defaultVariation) => {
					if (typeof nextVariation.attributes === "object") {
						setAttributes({ ...attributes, ...nextVariation.attributes });
					}
					if (nextVariation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
							true
						);
					}
				}}
				variations={variations}
				allowSkip
			/>
		</div>
	);
};

const FormEdit = (props) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		(select) =>
			(select(blockEditorStore) as any).getBlocks(clientId).length > 0,
		[clientId]
	);
	const Component = hasInnerBlocks ? Edit : Placeholder;

	return <Component {...props} />;
};

export default FormEdit;
