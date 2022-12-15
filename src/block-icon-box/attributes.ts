import { AttrsGenericType } from "../block-container/attributes";
import {
	MyResponsiveConditionControlData,
	RESPONSIVE_CONDITON_DEMO,
} from "../components/controls/MyResponsiveConditionControl/MyResponsiveConditionControl";
import {
	MyZIndexControlData,
	Z_INDEX_DEMO,
} from "../components/controls/MyZIndexControl/MyZIndexControl";
import {
	WCB_ICON_BOX_PANEL_ICON,
	WCB_ICON_BOX_PANEL_ICON_DEMO,
} from "./WcbIconBoxPanelIcon";
import {
	WCB_ICON_BOX_PANEL_LAYOUT,
	WCB_ICON_BOX_PANEL_LAYOUT_DEMO,
} from "./WcbIconBoxPanelLayout";

import {
	WCB_ICON_BOX_PANEL_STYLE_DESIGNATION,
	WCB_ICON_BOX_PANEL_STYLE_DESIGNATION_DEMO,
} from "./WcbTeamPanel_StyleDesignation";
import {
	WCB_ICON_BOX_PANEL_STYLE_DESCRIPTION,
	WCB_ICON_BOX_PANEL_STYLE_DESCRIPTION_DEMO,
} from "./WcbTeamPanel_StyleDescription";
import {
	WCB_ICON_BOX_PANEL_STYLE_TITLE,
	WCB_ICON_BOX_PANEL_STYLE_TITLE_DEMO,
} from "./WcbTeamPanel_StyleTitle";
import {
	WCB_ICON_BOX_PANEL_STYLE_ICON,
	WCB_ICON_BOX_PANEL_STYLE_ICON_DEMO,
} from "./WcbIconBoxPanel_StyleIcons";

import {
	WCB_ICON_BOX_PANEL_STYLE_SEPARATOR,
	WCB_ICON_BOX_PANEL_STYLE_SEPARATOR_DEMO,
} from "./WcbIconBoxPanel_StyleSeparator";
import {
	WCB_ICON_BOX_PANEL_STYLE_DIMENSION,
	WCB_ICON_BOX_PANEL_STYLE_DIMENSION_DEMO,
} from "./WcbIconBoxPanel_StyleDimension";
import {
	WCB_ICON_BOX_PANEL_SEPARATOR,
	WCB_ICON_BOX_PANEL_SEPARATOR_DEMO,
} from "./WcbIconBoxPanelSeparator";
export interface WcbAttrs {
	uniqueId: string;
	heading: string;
	designation: string;
	description: string;
	//
	general_layout: WCB_ICON_BOX_PANEL_LAYOUT;
	general_icon: WCB_ICON_BOX_PANEL_ICON;
	general_separator: WCB_ICON_BOX_PANEL_SEPARATOR;
	style_title: WCB_ICON_BOX_PANEL_STYLE_TITLE;
	style_desination: WCB_ICON_BOX_PANEL_STYLE_DESIGNATION;
	style_separator: WCB_ICON_BOX_PANEL_STYLE_SEPARATOR;
	style_description: WCB_ICON_BOX_PANEL_STYLE_DESCRIPTION;
	style_socialIcons: WCB_ICON_BOX_PANEL_STYLE_ICON;
	style_dimension: WCB_ICON_BOX_PANEL_STYLE_DIMENSION;
	//
	advance_responsiveCondition: MyResponsiveConditionControlData;
	advance_zIndex: MyZIndexControlData;
}

const blokc1Attrs: AttrsGenericType<WcbAttrs> = {
	uniqueId: {
		type: "string",
		default: "",
	},

	// THE ATTRS OF BLOCK HERE
	heading: {
		type: "string",
		source: "html",
		selector: ".wcb-icon-box__heading",
		default: "John Doe",
	},
	designation: {
		type: "string",
		source: "html",
		selector: ".wcb-icon-box__designation",
		default: "Write a Prefix",
	},
	description: {
		type: "string",
		source: "html",
		selector: ".wcb-icon-box__description",
		default:
			"Click here to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
	},
	//

	general_layout: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_LAYOUT_DEMO,
	},
	general_icon: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_ICON_DEMO,
	},
	general_separator: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_SEPARATOR_DEMO,
	},

	style_title: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_STYLE_TITLE_DEMO,
	},
	style_desination: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_STYLE_DESIGNATION_DEMO,
	},
	style_separator: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_STYLE_SEPARATOR_DEMO,
	},
	style_description: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_STYLE_DESCRIPTION_DEMO,
	},
	style_socialIcons: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_STYLE_ICON_DEMO,
	},

	style_dimension: {
		type: "object",
		default: WCB_ICON_BOX_PANEL_STYLE_DIMENSION_DEMO,
	},

	// ADVANCE
	advance_responsiveCondition: {
		type: "object",
		default: RESPONSIVE_CONDITON_DEMO,
	},
	advance_zIndex: {
		type: "object",
		default: Z_INDEX_DEMO,
	},
};

export default blokc1Attrs;
