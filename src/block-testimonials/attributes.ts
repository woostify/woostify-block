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
	WCB_TESTIMONIALS_PANEL_CAROUSEL,
	WCB_TESTIMONIALS_PANEL_CAROUSEL_DEMO,
} from "./WcbTestimonialsPanelCarousel";
import {
	WCB_TESTIMONIALS_PANEL_GENERAL,
	WCB_TESTIMONIALS_PANEL_GENERAL_DEMO,
} from "./WcbTestimonialsPanelGeneral";
import {
	WCB_TESTIMONIALS_PANEL_IMAGES,
	WCB_TESTIMONIALS_PANEL_IMAGES_DEMO,
} from "./WcbTestimonialsPanelImages";
import {
	WCB_TESTIMONIALS_PANEL_STYLE_ARROW_DOTS,
	WCB_TESTIMONIALS_PANEL_STYLE_ARROW_DOTS_DEMO,
} from "./WcbTestimonialsPanel_StyleArrowDots";
import {
	WCB_TESTIMONIALS_PANEL_STYLE_COMPANY,
	WCB_TESTIMONIALS_PANEL_STYLE_COMPANY_DEMO,
} from "./WcbTestimonialsPanel_StyleCompany";
import { WCB_TESTIMONIALS_PANEL_STYLE_CONTENT_DEMO } from "./WcbTestimonialsPanel_StyleContent";
import {
	WCB_TESTIMONIALS_PANEL_STYLE_IMAGE,
	WCB_TESTIMONIALS_PANEL_STYLE_IMAGE_DEMO,
} from "./WcbTestimonialsPanel_StyleImage";
import {
	WCB_TESTIMONIALS_PANEL_STYLE_NAME,
	WCB_TESTIMONIALS_PANEL_STYLE_NAME_DEMO,
} from "./WcbTestimonialsPanel_StyleName";

export interface TestimonialItem {
	content: string;
	name: string;
	companyName: string;
}

export interface WcbAttrs {
	uniqueId: string;
	testimonials: TestimonialItem[];
	//
	general_general: WCB_TESTIMONIALS_PANEL_GENERAL;
	general_images: WCB_TESTIMONIALS_PANEL_IMAGES;
	general_carousel: WCB_TESTIMONIALS_PANEL_CAROUSEL;
	//
	style_name: WCB_TESTIMONIALS_PANEL_STYLE_NAME;
	style_content: WCB_TESTIMONIALS_PANEL_STYLE_NAME;
	style_company: WCB_TESTIMONIALS_PANEL_STYLE_COMPANY;
	style_image: WCB_TESTIMONIALS_PANEL_STYLE_IMAGE;
	style_arrowAndDots: WCB_TESTIMONIALS_PANEL_STYLE_ARROW_DOTS;
	//
	advance_responsiveCondition: MyResponsiveConditionControlData;
	advance_zIndex: MyZIndexControlData;
}

const blokc1Attrs: AttrsGenericType<WcbAttrs> = {
	uniqueId: {
		type: "string",
		default: "",
	},

	testimonials: {
		type: "array",
		default: [],
	},

	// THE ATTRS OF BLOCK HERE
	general_general: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_GENERAL_DEMO,
	},
	general_images: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_IMAGES_DEMO,
	},
	general_carousel: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_CAROUSEL_DEMO,
	},
	//
	style_name: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_STYLE_NAME_DEMO,
	},
	style_content: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_STYLE_CONTENT_DEMO,
	},
	style_company: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_STYLE_COMPANY_DEMO,
	},
	style_image: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_STYLE_IMAGE_DEMO,
	},
	style_arrowAndDots: {
		type: "object",
		default: WCB_TESTIMONIALS_PANEL_STYLE_ARROW_DOTS_DEMO,
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
