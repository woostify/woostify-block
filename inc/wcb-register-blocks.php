<?php

//============================================================================================================================================
// START REGISTER GUTENBERG BLOCKS
//======================================================================================================================================
require WCB_PATH . 'inc/wcb-render-callback-for-block-posts-grid.php';
require WCB_PATH . 'inc/wcb-render-callback-for-block-products.php';
require WCB_PATH . 'inc/wcb-ajax-for-block-form.php';
// 


add_action('init', 'wcb_create_blocks_gutenberg_init');
if (!function_exists("wcb_create_blocks_gutenberg_init")) {
    function wcb_create_blocks_gutenberg_init()
    {
        $wcb_blocks_enable_disable = get_option('wcb_blocks_enable_disable_options') ?? [];

        // common - not deactive
        register_block_type(
            WCB_BUILD_PATH . '/block-common-css',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/____toolbar-patterns',
            []
        );
        // common - not deactive

        if (defined('WC_PLUGIN_FILE')) :
            register_block_type(
                WCB_BUILD_PATH . '/block-products',
                [
                    "render_callback"     => "wcb_block_products__renderCallback",
                    // "ancestor"     => (($wcb_blocks_enable_disable['wcb/products'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME,
                ]
            );
        endif;

        register_block_type(
            WCB_BUILD_PATH . '/block-container',
            [
                "render_callback"     => "wcb_block_container__renderCallback",
                "ancestor"     => (($wcb_blocks_enable_disable['wcb/container'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME,
            ]
        );


        register_block_type(
            WCB_BUILD_PATH . '/block-heading',
            [
                "render_callback"     => "wcb_block_heading__renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/heading'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME
            ]
        );


        register_block_type(
            WCB_BUILD_PATH . '/block-posts-grid',
            [
                "render_callback"     => "wcb_block_posts_grid__renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/posts-grid'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME
            ]
        );


        // FORM
        register_block_type(
            WCB_BUILD_PATH . '/block-form',
            [
                "render_callback"     => "wcb_block_form__renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/form'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME
            ]
        );

        // FORM CHILD BLOCKS
        register_block_type(
            WCB_BUILD_PATH . '/block-input',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-email',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-phone',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-textarea',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-checkbox',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-radio',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-url',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-select',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-toggle',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-date',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-accept',
            []
        );
        register_block_type(
            WCB_BUILD_PATH . '/block-hidden',
            []
        );
        // END FORM CHILD BLOCKS


        // 
        register_block_type(
            WCB_BUILD_PATH . '/block-testimonials',
            [
                "render_callback"     => "wcb_block_testimonials__renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/testimonials'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME
            ]
        );


        register_block_type(
            WCB_BUILD_PATH . '/block-buttons',
            [
                "render_callback"     => "wcb_block_buttons__renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/buttons'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME
            ]
        );
        // BUTTON CHILD
        register_block_type(
            WCB_BUILD_PATH . '/block-button',
            [
                "render_callback"     => "wcb_block_button__renderCallback",
            ]
        );


        register_block_type(
            WCB_BUILD_PATH . '/block-cta',
            [
                "render_callback"     => "wcb_block_cta_renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/cta'] ?? "") !== 'disabled') ? null : WCB_UNIQUE_NAME
            ]
        );


        register_block_type(
            WCB_BUILD_PATH . '/block-faq',
            [
                "render_callback"     => "wcb_block_faq_renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/faq'] ?? "") !== 'disabled')  ? null : WCB_UNIQUE_NAME
            ]
        );
        // FAQ CHILD
        register_block_type(
            WCB_BUILD_PATH . '/block-faq-child',
            []
        );

        register_block_type(
            WCB_BUILD_PATH . '/block-team',
            [
                "render_callback"     => "wcb_block_team_renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/team'] ?? "") !== 'disabled')  ? null : WCB_UNIQUE_NAME
            ]
        );


        register_block_type(
            WCB_BUILD_PATH . '/block-icon-box',
            [
                "render_callback"     => "wcb_block_icon_box_renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/icon-box'] ?? "") !== 'disabled')  ? null : WCB_UNIQUE_NAME
            ]
        );



        register_block_type(
            WCB_BUILD_PATH . '/block-image',
            [
                "render_callback"     => "wcb_block_image_renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/image'] ?? "") !== 'disabled')  ? null : WCB_UNIQUE_NAME
            ]
        );



        register_block_type(
            WCB_BUILD_PATH . '/block-map',
            [
                "render_callback"     => "wcb_block_map_renderCallback",
                "ancestor"              => (($wcb_blocks_enable_disable['wcb/map'] ?? "") !== 'disabled')  ? null : WCB_UNIQUE_NAME
            ]
        );
    }
}
