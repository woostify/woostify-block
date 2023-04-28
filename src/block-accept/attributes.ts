import {
	AttrsGenericType,
	WcbAttrsCommonFromWp,
} from "../block-container/attributes";
import {
	WCB_ACCEPT_PANEL_GENERAL,
	WCB_ACCEPT_PANEL_GENERAL_DEMO,
} from "./WcbAcceptPanelGeneral";
export interface WcbAttrs extends WcbAttrsCommonFromWp {
	uniqueId: string;
	label: string;
	//
	general_general: WCB_ACCEPT_PANEL_GENERAL;
	//
}

const blokc1Attrs: AttrsGenericType<WcbAttrs> = {
	uniqueId: {
		type: "string",
		default: "",
	},
	label: {
		type: "string",
		source: "html",
		selector: ".wcb-form__label",
		default: "Label",
	},
	//
	general_general: {
		type: "object",
		default: WCB_ACCEPT_PANEL_GENERAL_DEMO,
	},
};

export default blokc1Attrs;
