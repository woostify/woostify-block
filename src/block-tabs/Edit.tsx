import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	RichText,
	useBlockProps,
	// @ts-ignore
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import React, { useEffect, FC, useRef, useCallback } from "react";
import { WcbAttrs } from "./attributes";
import HOCInspectorControls, {
	InspectorControlsTabs,
} from "../components/HOCInspectorControls";
import { EditProps } from "../block-container/Edit";
import GlobalCss from "./GlobalCss";
import "./editor.scss";
import useSetBlockPanelInfo from "../hooks/useSetBlockPanelInfo";
import AdvancePanelCommon from "../components/AdvancePanelCommon";
import WcbFaqPanelGeneral from "./WcbFaqPanelGeneral";
import WcbFaqPanelIcon from "./WcbFaqPanelIcon";
import { useSelect, useDispatch } from "@wordpress/data";
import WcbFaqPanel_StyleContainer, {
	WCB_FAQ_PANEL_STYLE_CONTAINER_DEMO,
	WCB_FAQ_PANEL_STYLE_CONTAINER_DEMO_SOLID,
} from "./WcbFaqPanel_StyleContainer";
import WcbFaqPanel_StyleQuestion, {
	WCB_FAQ_PANEL_STYLE_QUESTION_DEMO,
} from "./WcbFaqPanel_StyleQuestion";
import WcbFaqPanel_StyleAnswer, {
	WCB_FAQ_PANEL_STYLE_ANSWER_DEMO,
} from "./WcbFaqPanel_StyleAnswer";
import WcbFaqPanel_StyleIcon, {
	WCB_FAQ_PANEL_STYLE_ICON_DEMO,
} from "./WcbFaqPanel_StyleIcon";
import WcbFaqPanelPreset from "./WcbFaqPanelPreset";
import MyCacheProvider from "../components/MyCacheProvider";
import { WcbAttrsForSave } from "./Save";
import converUniqueIdToAnphaKey from "../utils/converUniqueIdToAnphaKey";
import WcbTabsPanelTabTitle from "./WcbTabsPanelTabTitle";
import { Button } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";
import { BlockTabTitleItem } from "./types";

const Edit: FC<EditProps<WcbAttrs>> = (props) => {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		advance_responsiveCondition,
		advance_zIndex,
		advance_motionEffect,
		uniqueId,
		general_tabTitle,
		titles,
		//
		style_container,
		style_question,
		style_icon,
		style_answer,
		general_preset,
	} = attributes;
	//  COMMON HOOKS
	const ref = useRef<HTMLDivElement>(null);
	// const { myCache, ref } = useCreateCacheEmotion();
	const wrapBlockProps = useBlockProps({ ref });
	const {
		tabIsOpen,
		tabAdvancesIsPanelOpen,
		tabGeneralIsPanelOpen,
		tabStylesIsPanelOpen,
		handleTogglePanel,
	} = useSetBlockPanelInfo(uniqueId);

	// make uniqueid
	const UNIQUE_ID = wrapBlockProps.id;
	useEffect(() => {
		setAttributes({
			uniqueId: converUniqueIdToAnphaKey(UNIQUE_ID),
		});
	}, [UNIQUE_ID]);

	//
	// HOOKS
	const { childInnerBlocks } = useSelect(
		(select) => {
			return {
				// @ts-ignore
				childInnerBlocks: select(blockEditorStore).getBlocks(clientId),
			};
		},
		[clientId]
	);
	const { insertBlock, removeBlock } = useDispatch(blockEditorStore);

	// thuc hien dieu nay khi khoi tao block lan dau
	useEffect(() => {
		if (!childInnerBlocks || !childInnerBlocks?.length) {
			return;
		}
		if (titles?.[0]?.id !== "1") {
			return;
		}
		// chi thuc hien dieu nay khi khoi tao block lan dau
		const newTitles: BlockTabTitleItem[] = childInnerBlocks.map(
			(block, index) => {
				return { id: block.clientId, title: titles?.[index]?.title || "Title" };
			}
		);
		setAttributes({ titles: newTitles });
	}, []);
	//

	const renderTabBodyPanels = (tab: InspectorControlsTabs[number]) => {
		switch (tab.name) {
			case "General":
				return (
					<>
						<WcbFaqPanelPreset
							onToggle={() => handleTogglePanel("General", "Preset", true)}
							initialOpen={
								tabGeneralIsPanelOpen === "Preset" ||
								tabGeneralIsPanelOpen === "first"
							}
							opened={tabGeneralIsPanelOpen === "Preset" || undefined}
							//
							setAttr__={(data) => {
								if (data.preset === "carousel-simple") {
									return setAttributes({
										general_preset: data,
										style_container: WCB_FAQ_PANEL_STYLE_CONTAINER_DEMO,
										style_answer: WCB_FAQ_PANEL_STYLE_ANSWER_DEMO,
										style_question: WCB_FAQ_PANEL_STYLE_QUESTION_DEMO,
										style_icon: WCB_FAQ_PANEL_STYLE_ICON_DEMO,
									});
								}
								if (data.preset === "carousel-solid") {
									return setAttributes({
										general_preset: data,

										style_container: WCB_FAQ_PANEL_STYLE_CONTAINER_DEMO_SOLID,
										style_answer: WCB_FAQ_PANEL_STYLE_ANSWER_DEMO,
										style_question: WCB_FAQ_PANEL_STYLE_QUESTION_DEMO,
										style_icon: WCB_FAQ_PANEL_STYLE_ICON_DEMO,
									});
								}
								if (data.preset === "grid-simple") {
									return setAttributes({
										general_preset: data,

										style_container: WCB_FAQ_PANEL_STYLE_CONTAINER_DEMO,
										style_answer: WCB_FAQ_PANEL_STYLE_ANSWER_DEMO,
										style_question: WCB_FAQ_PANEL_STYLE_QUESTION_DEMO,
									});
								}
								if (data.preset === "grid-solid") {
									return setAttributes({
										general_preset: data,

										style_container: WCB_FAQ_PANEL_STYLE_CONTAINER_DEMO_SOLID,
										style_answer: WCB_FAQ_PANEL_STYLE_ANSWER_DEMO,
										style_question: WCB_FAQ_PANEL_STYLE_QUESTION_DEMO,
									});
								}

								setAttributes({
									general_preset: data,
								});
							}}
							panelData={general_preset}
						/>

						<WcbTabsPanelTabTitle
							onToggle={() => handleTogglePanel("General", "TabTitle")}
							initialOpen={tabGeneralIsPanelOpen === "TabTitle"}
							opened={tabGeneralIsPanelOpen === "TabTitle" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({
									general_tabTitle: data,
								});
							}}
							panelData={general_tabTitle}
							tabTitles={titles}
						/>
					</>
				);
			case "Styles":
				return (
					<>
						<WcbFaqPanel_StyleContainer
							onToggle={() =>
								handleTogglePanel("Styles", "_StyleContainer", true)
							}
							initialOpen={
								tabStylesIsPanelOpen === "_StyleContainer" ||
								tabStylesIsPanelOpen === "first"
							}
							opened={tabStylesIsPanelOpen === "_StyleContainer" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({
									style_container: data,
									general_preset: { ...general_preset, preset: "" },
								});
							}}
							panelData={style_container}
						/>

						<WcbFaqPanel_StyleQuestion
							onToggle={() => handleTogglePanel("Styles", "_StyleQuestion")}
							initialOpen={tabStylesIsPanelOpen === "_StyleQuestion"}
							opened={tabStylesIsPanelOpen === "_StyleQuestion" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({
									style_question: data,
									general_preset: { ...general_preset, preset: "" },
								});
							}}
							panelData={style_question}
						/>

						<WcbFaqPanel_StyleIcon
							onToggle={() => handleTogglePanel("Styles", "_StyleIcon")}
							initialOpen={tabStylesIsPanelOpen === "_StyleIcon"}
							opened={tabStylesIsPanelOpen === "_StyleIcon" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({
									style_icon: data,
									general_preset: { ...general_preset, preset: "" },
								});
							}}
							panelData={style_icon}
						/>

						<WcbFaqPanel_StyleAnswer
							onToggle={() => handleTogglePanel("Styles", "_StyleAnswer")}
							initialOpen={tabStylesIsPanelOpen === "_StyleAnswer"}
							opened={tabStylesIsPanelOpen === "_StyleAnswer" || undefined}
							//
							setAttr__={(data) => {
								setAttributes({
									style_answer: data,
									general_preset: { ...general_preset, preset: "" },
								});
							}}
							panelData={style_answer}
						/>
					</>
				);
			case "Advances":
				return (
					<>
						<AdvancePanelCommon
							advance_motionEffect={attributes.advance_motionEffect}
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

	// INNER BLOCK
	// const blockProps = useBlockProps({
	// 	className: `wcb-tabs__inner`,
	// });

	// const innerBlocksProps = useInnerBlocksProps(blockProps, {
	// 	allowedBlocks: ["wcb/tab-child"],
	// 	template: [
	// 		["wcb/tab-child", {}],
	// 		["wcb/tab-child", {}],
	// 		["wcb/tab-child", {}],
	// 	],
	// 	renderAppender: () => {
	// 		return isSelected ? <InnerBlocks.DefaultBlockAppender /> : false;
	// 	},
	// });

	const WcbAttrsForSave = useCallback((): WcbAttrsForSave => {
		return {
			advance_responsiveCondition,
			advance_zIndex,
			uniqueId,
			advance_motionEffect,
			general_tabTitle,
			titles,
			//
			style_answer,
			style_container,
			style_icon,
			style_question,
		};
	}, [
		advance_responsiveCondition,
		advance_zIndex,
		general_tabTitle,
		style_answer,
		style_container,
		style_icon,
		style_question,
		uniqueId,
		advance_motionEffect,
		titles,
	]);

	return (
		<MyCacheProvider uniqueKey={clientId}>
			<div
				{...wrapBlockProps}
				className={`${wrapBlockProps?.className} wcb-tabs__wrap p-2 ${uniqueId}`}
				data-uniqueid={uniqueId}
			>
				{/* CONTROL SETTINGS */}
				<HOCInspectorControls
					renderTabPanels={renderTabBodyPanels}
					uniqueId={uniqueId}
				/>

				{/* CSS IN JS */}
				{uniqueId && <GlobalCss {...WcbAttrsForSave()} />}

				{/* CHILD CONTENT  */}
				<div className="wcb-tabs__titles">
					{titles.map((item, _) => {
						return (
							<div>
								{item.id}
								<RichText
									key={item.id}
									tagName="p"
									className="wcb-tabs__title"
									value={item.title}
									onChange={(value) => {
										const newTitles = titles.map((j) =>
											j.id !== item.id ? j : { id: j.id, title: value }
										);
										setAttributes({ titles: newTitles });
									}}
									placeholder="Title"
								/>
								<Button
									onClick={() => {
										const newTitles = titles.filter((j) => j.id !== item.id);
										removeBlock(item.id);
										setAttributes({ titles: newTitles });
									}}
								>
									Remove
								</Button>
							</div>
						);
					})}

					<Button
						onClick={() => {
							const newChild = createBlock("wcb/tab-child");
							insertBlock(newChild, undefined, clientId);
							if (newChild?.clientId) {
								setAttributes({
									titles: [
										...titles,
										{ id: newChild.clientId, title: "Title" },
									],
								});
							}
						}}
					>
						Add new
					</Button>
				</div>

				<InnerBlocks
					allowedBlocks={["wcb/tab-child"]}
					template={[
						["wcb/tab-child", {}],
						["wcb/tab-child", {}],
						["wcb/tab-child", {}],
					]}
				/>
				{/* <div {...innerBlocksProps} /> */}
			</div>
		</MyCacheProvider>
	);
};

export default Edit;
