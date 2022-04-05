import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TabPanel } from '@wordpress/components';
import { useState, useEffect } from 'react';

import { getDeviceSuffix } from '../../components/get-device-type';

import WoostifyBaseControl from '../../components/controls/base';
import WoostifyDimensionsControl from '../../components/controls/dimensions';
import WoostifyButtonPopoverControl from '../../components/controls/button-popover';
import WoostifyTypographyControl from '../../components/controls/typography';

import './editor.scss';

function Edit(props) {
	const deviceSuffix = getDeviceSuffix();

	const [columns, setColumns] = useState(2);

	const { attributes, setAttributes, clientId } = props;
	const { uniqueId } = attributes;

	useEffect(() => {
		setAttributes({
			uniqueId: clientId.substr(2, 9).replace('-', ''),
		});
	});

	console.log(deviceSuffix);

	let lineHeightCSS =
		attributes['lineHeight' + deviceSuffix] +
		attributes['lineHeightUnit' + deviceSuffix];
	let fontSizeCSS =
		attributes['fontSize' + deviceSuffix] +
		attributes['fontSizeUnit' + deviceSuffix];
	let letterSpacingCSS = attributes['letterSpacing' + deviceSuffix] + 'px';

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('General Settings', 'woostify-block')}>
					<WoostifyButtonPopoverControl
						popoverHeading={__('Typography', 'woostify-block')}
					>
						<WoostifyTypographyControl
							{...props}
							attrFontFamily={'fontFamily'}
							attrFontWeight={'fontWeight'}
							attrTextTransform={'fontTransform'}
							attrFontStyle={'fontStyle'}
							attrLineHeight={'lineHeight'}
							attrLineHeightUnit={'lineHeightUnit'}
							attrLetterSpacing={'letterSpacing'}
							attrFontSize={'fontSize'}
							attrFontSizeUnit={'fontSizeUnit'}
							fontSizeUnits={['px', 'em', 'rem']}
							lineHeightUnits={['px', 'em']}
						/>
					</WoostifyButtonPopoverControl>

					<WoostifyBaseControl
						{...props}
						label={__('Padding', 'woostify-block')}
						responsive={['desktop', 'tablet', 'mobile']}
						units={['px', 'rem']}
						selectedUnit={attributes['paddingUnit' + deviceSuffix]}
						onUnitClick={(unit) =>
							setAttributes({
								['paddingUnit' + deviceSuffix]: unit,
							})
						}
					>
						<WoostifyDimensionsControl
							{...props}
							type={'padding'}
							attrTop={'paddingTop' + deviceSuffix}
							attrRight={'paddingRight' + deviceSuffix}
							attrBottom={'paddingBottom' + deviceSuffix}
							attrLeft={'paddingLeft' + deviceSuffix}
						/>
					</WoostifyBaseControl>
					<WoostifyBaseControl
						label={__('Margin', 'woostify-block')}
						responsive={['desktop', 'tablet', 'mobile']}
						units={['px', 'rem']}
						selectedUnit={attributes['marginUnit' + deviceSuffix]}
						onUnitClick={(unit) =>
							setAttributes({
								['marginUnit' + deviceSuffix]: unit,
							})
						}
					>
						<WoostifyDimensionsControl
							{...props}
							type={'margin'}
							attrTop={'marginTop' + deviceSuffix}
							attrRight={'marginRight' + deviceSuffix}
							attrBottom={'marginBottom' + deviceSuffix}
							attrLeft={'marginLeft' + deviceSuffix}
							labelTop={__('T-Left', 'woostify-block')}
							labelRight={__('T-Right', 'woostify-blocks')}
							labelBottom={__('B-Right', 'woostify-block')}
							labelLeft={__('B-Left', 'woostify-block')}
							disableInputs={[
								'marginLeft' + deviceSuffix,
								'marginRight' + deviceSuffix,
							]}
						/>
					</WoostifyBaseControl>
				</PanelBody>
			</InspectorControls>
			<div className="woostify-block" id={`woostify-block-${uniqueId}`}>
				<style>
					{`#woostify-block-${uniqueId} .woostify-block-text {
							font-family: ${attributes.fontFamily};
							font-weight: ${attributes.fontWeight};
							text-transform: ${attributes.fontTransform};
							font-style: ${attributes.fontStyle};
							line-height: ${lineHeightCSS};
							font-size: ${fontSizeCSS};
							letter-spacing: ${letterSpacingCSS};
							backgroundColor: ${attributes.bg_color},
							color: ${attributes.text_color},
						}`}
				</style>
				<RichText
					tagName="h2"
					className="woostify-block-text"
					value={attributes.message}
					onChange={(val) => setAttributes({ message: val })}
				/>
			</div>
		</div>
	);
}

export default Edit;
