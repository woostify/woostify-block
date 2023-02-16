import {
	CustomSelectControl,
	FormTokenField,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React, { FC } from "react";

// @ts-ignore
import { __experimentalInputControl as InputControl } from "@wordpress/components";
import MyLabelControl from "../components/controls/MyLabelControl/MyLabelControl";
import { HasResponsive } from "../components/controls/MyBackgroundControl/types";
import getValueFromAttrsResponsives from "../utils/getValueFromAttrsResponsives";
import { ResponsiveDevices } from "../components/controls/MyResponsiveToggle/MyResponsiveToggle";
import useGetDeviceType from "../hooks/useGetDeviceType";
import {
	QUERY_DEFAULT_ATTRIBUTES,
	get_STOCK_STATUS_OPTIONS,
} from "./constants";
import ProductCategoryControl from "./product-category-control";
import ProductTagControl from "./product-tag-control";
import MyDisclosure from "../components/controls/MyDisclosure";
import ProductAttributeTermControl from "./product-attribute-term-control";
import MyRadioGroup, { MyRadioItem } from "../components/controls/MyRadioGroup";
import HelpText from "../components/controls/HelpText";

export type ProductOrderBy =
	| "ID"
	| "menu_order title"
	| "title"
	| "relevance"
	| "rand"
	| "date ID"
	| "order_by_price_desc_post_clauses"
	| "order_by_price_asc_post_clauses"
	| "order_by_popularity_post_clauses"
	| "order_by_rating_post_clauses";

export interface WCB_PRODUCTS_PANEL_SORTINGANDFILTERING {
	emptyMessage: string;
	numberOfItems: number;
	isEqualHeight: boolean;
	isOnSale: boolean;
	stockStatus: string[];
	categories: string[];
	tags: string[];
	attributes: any[];
	keyword: string;
	catOperator: string;
	tagOperator: string;
	attrOperator: string;
	orderBy: ProductOrderBy;
	order: "DESC" | "ASC";
	numberOfColumn: HasResponsive<number>;
	swithToScrollSnapX: ResponsiveDevices | "None";
}
export const WCB_PRODUCTS_PANEL_SORTINGANDFILTERING_DEMO: WCB_PRODUCTS_PANEL_SORTINGANDFILTERING =
	{
		emptyMessage: "No post found!",
		numberOfItems: 10,
		numberOfColumn: { Desktop: 3 },
		isEqualHeight: true,
		isOnSale: false,
		stockStatus: [],
		categories: [],
		tags: [],
		attributes: [],
		keyword: "",
		catOperator: "any",
		tagOperator: "any",
		attrOperator: "any",
		order: "DESC",
		orderBy: "date ID",
		swithToScrollSnapX: "None",
	};

interface Props
	extends Pick<PanelBody.Props, "onToggle" | "opened" | "initialOpen"> {
	panelData: WCB_PRODUCTS_PANEL_SORTINGANDFILTERING;
	setAttr__: (data: WCB_PRODUCTS_PANEL_SORTINGANDFILTERING) => void;
}

function getStockStatusIdByLabel(statusLabel: FormTokenField.Value) {
	const label =
		typeof statusLabel === "string" ? statusLabel : statusLabel.value;

	return Object.entries(get_STOCK_STATUS_OPTIONS()).find(
		([, value]) => value === label
	)?.[0];
}

const WcbProducstPanelSortingAndFiltering: FC<Props> = ({
	panelData = WCB_PRODUCTS_PANEL_SORTINGANDFILTERING_DEMO,
	setAttr__,
	initialOpen,
	onToggle,
	opened,
}) => {
	const deviceType: ResponsiveDevices = useGetDeviceType() || "Desktop";
	const { currentDeviceValue: currentNumberOfColumn } =
		getValueFromAttrsResponsives(panelData.numberOfColumn, deviceType);

	const STOCK_STATUS_OPTIONS = get_STOCK_STATUS_OPTIONS();

	const renderSelectOrderBy = () => {
		const OPTIONS: {
			label: string;
			value: ProductOrderBy;
		}[] = [
			{
				label: __("ID", "wcb"),
				value: "ID",
			},
			{
				label: __("Date", "wcb"),
				value: "date ID",
			},
			{
				label: __("Title", "wcb"),
				value: "title",
			},
			{
				label: __("Menu order", "wcb"),
				value: "menu_order title",
			},
			{
				label: __("Popularity", "wcb"),
				value: "order_by_popularity_post_clauses",
			},
			{
				label: __("Price_asc", "wcb"),
				value: "order_by_price_asc_post_clauses",
			},
			{
				label: __("Price_desc", "wcb"),
				value: "order_by_price_desc_post_clauses",
			},
			{
				label: __("Rating", "wcb"),
				value: "order_by_rating_post_clauses",
			},
			{
				label: __("Relevance", "wcb"),
				value: "relevance",
			},
			{
				label: __("Random", "wcb"),
				value: "rand",
			},
		];

		return (
			<SelectControl
				label={__("Order products by", "wcb")}
				value={panelData.orderBy}
				options={OPTIONS}
				onChange={(orderby) => setAttr__({ ...panelData, orderBy: orderby })}
			/>
		);
	};

	const SNAPX_POSTION_PLANS: MyRadioItem<
		WCB_PRODUCTS_PANEL_SORTINGANDFILTERING["swithToScrollSnapX"]
	>[] = [
		{ name: "Desktop", icon: "Desktop" },
		{ name: "Tablet", icon: "Tablet" },
		{ name: "Mobile", icon: "Mobile" },
		{ name: "None", icon: "None" },
	];

	return (
		<PanelBody
			className={"space-y-5"}
			initialOpen={initialOpen}
			onToggle={onToggle}
			opened={opened}
			title={__("Sorting and filtering", "wcb")}
		>
			{renderSelectOrderBy()}

			<SelectControl
				label={__("Order", "wcb")}
				value={panelData.order}
				options={[
					{
						label: __("DESC", "wcb"),
						value: "DESC",
					},
					{
						label: __("ASC", "wcb"),
						value: "ASC",
					},
				]}
				onChange={(order) => setAttr__({ ...panelData, order })}
			/>

			<ToggleControl
				label={__("Show only products on sale", "wcb")}
				checked={!!panelData.isOnSale}
				onChange={(isOnSale) => {
					setAttr__({
						...panelData,
						isOnSale,
					});
				}}
			/>

			{/*  */}
			<div className="space-y-3">
				<MyDisclosure label="PRODUCT CATEGORIES">
					<ProductCategoryControl
						selected={panelData.categories}
						operator={panelData.catOperator}
						onOperatorChange={(operator) => {
							setAttr__({
								...panelData,
								catOperator: operator,
							});
						}}
						onChange={(value) => {
							const ids = value.map(({ id }) => id);
							setAttr__({
								...panelData,
								categories: ids,
							});
						}}
					/>
				</MyDisclosure>

				<MyDisclosure label="PRODUCT TAGS">
					<ProductTagControl
						selected={panelData.tags}
						operator={panelData.tagOperator}
						onOperatorChange={(operator) => {
							setAttr__({
								...panelData,
								tagOperator: operator,
							});
						}}
						onChange={(value) => {
							const ids = value.map(({ id }) => id);
							setAttr__({
								...panelData,
								tags: ids,
							});
						}}
					/>
				</MyDisclosure>

				<MyDisclosure label="PRODUCT ATTRIBUTES">
					<ProductAttributeTermControl
						selected={panelData.attributes}
						onChange={(value = []) => {
							const result = value.map(({ id, attr_slug: attributeSlug }) => ({
								id,
								attr_slug: attributeSlug,
							}));
							setAttr__({ ...panelData, attributes: result });
						}}
						operator={panelData.attrOperator}
						onOperatorChange={(value = "any") =>
							setAttr__({ ...panelData, attrOperator: value })
						}
						isCompact
					/>
				</MyDisclosure>
			</div>

			<InputControl
				value={panelData.keyword}
				label={__("KEYWORD", "wcb")}
				onChange={(nextValue) =>
					setAttr__({ ...panelData, keyword: nextValue })
				}
			/>

			<FormTokenField
				label={__("Stock status", "wcb")}
				onChange={(statusLabels) => {
					const __woocommerceStockStatus = statusLabels
						.map(getStockStatusIdByLabel)
						.filter(Boolean) as string[];

					setAttr__({
						...panelData,
						stockStatus: __woocommerceStockStatus,
					});
				}}
				suggestions={Object.values(STOCK_STATUS_OPTIONS)}
				// @ts-ignore
				validateInput={(value: string) =>
					Object.values(STOCK_STATUS_OPTIONS).includes(value)
				}
				value={
					panelData.stockStatus.map((key) => STOCK_STATUS_OPTIONS[key]) || []
				}
				__experimentalExpandOnFocus={true}
			/>

			{/*  */}
			<RangeControl
				label={
					<MyLabelControl hasResponsive>
						{__("Number of items", "wcb")}
					</MyLabelControl>
				}
				value={panelData.numberOfItems}
				onChange={(numberOfItems = 10) => {
					setAttr__({
						...panelData,
						numberOfItems,
					});
				}}
				min={1}
				max={40}
				required
			/>

			{/*  */}
			<RangeControl
				label={
					<MyLabelControl hasResponsive>{__("Columns", "wcb")}</MyLabelControl>
				}
				value={currentNumberOfColumn || 1}
				onChange={(number) => {
					setAttr__({
						...panelData,
						numberOfColumn: {
							...panelData.numberOfColumn,
							[deviceType]: number || 2,
						},
					});
				}}
				min={1}
				max={6}
				required
			/>

			<div>
				<MyRadioGroup
					label="Swith to scroll-snap-x"
					onChange={(selected) =>
						setAttr__({
							...panelData,
							swithToScrollSnapX: selected as any,
						})
					}
					value={panelData.swithToScrollSnapX}
					plans={SNAPX_POSTION_PLANS}
					hasResponsive={false}
					isWrap
				/>
				<HelpText>
					{__(
						"Device selection to start switching from layout GRID to layout is a scroll able row.",
						"wcb"
					)}
				</HelpText>
			</div>

			<ToggleControl
				label={__("Equal height", "wcb")}
				checked={panelData.isEqualHeight}
				onChange={(checked) => {
					setAttr__({ ...panelData, isEqualHeight: checked });
				}}
			/>

			<InputControl
				value={panelData.emptyMessage}
				label={__("Message when Posts Not Found", "wcb")}
				onChange={(nextValue) =>
					setAttr__({ ...panelData, emptyMessage: nextValue })
				}
			/>
		</PanelBody>
	);
};

export default WcbProducstPanelSortingAndFiltering;
