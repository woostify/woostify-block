<?php
function wcb_var_dump($value)
{
    echo '<p style="color:red; padding: 50px 200px">';
    echo ('-----------start--wcb_var_dump-----------------');
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    var_dump($value);
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    echo ('<br />');
    echo ('-----------end--wcb_var_dump-----------------');
    echo '</p>';
};

function vcb_var_export($value)
{
    echo '<pre style="color:red;"><code>';
    echo ('-----------start--wcb_var_dump-----------------');
    echo ('-----------start--vcb_var_export-----------------');
    echo ('<br />');
    var_export($value);
    echo ('<br />');
    echo ('-----------end--vcb_var_export-----------------');
    echo '</code></pre>';
};
// 
if (!function_exists('wcb_get_wcb_block_type_list')) :
    function wcb_get_wcb_block_type_list()
    {
        $blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
        $wcbBlockList = [];
        foreach ($blocks as $key => $value) {
            $pos = strpos($key, 'wcb/');
            if ($pos === 0) {
                $wcbBlockList[] = [
                    'name' => $value->name,
                    'title' => $value->title,
                    'category' => $value->category,
                    'icon' => $value->icon,
                    'parent' => $value->parent,
                ];
            }
        }
        return $wcbBlockList;
    };
endif;

// 
if (!function_exists('wcb_get_wcb_block_name_enable_init')) :
    function wcb_get_wcb_block_name_enable_init()
    {
        $blocks = wcb_get_wcb_block_type_list();
        $wcbBlockName = [];
        foreach ($blocks as $key => $value) {
            $wcbBlockName[$value['name']] = 'enabled';
        }

        return $wcbBlockName;
    };
endif;

//
if (!function_exists('wcb_get_default_blocks_settings')) :
    function wcb_get_default_blocks_settings()
    {
        return [
            'media_tablet'              => '768px',
            'media_desktop'             => '1024px',
            'reCAPTCHA_v3_site_key'     => '',
            'reCAPTCHA_v3_secret_key'   => '',
            'reCAPTCHA_v2_site_key'     => '',
            'reCAPTCHA_v2_secret_key'   => '',
            'defaultContentWidth'       => '1140px',
            'containerPadding'          => '10px',
            'enableTemplatesButton'     => 'true',
            'enableCopyPasteStyles'     => 'true',
        ];
    }
endif;

// 
if (!function_exists("wcb_pagination_bar")) {
    function wcb_pagination_bar($custom_query, $attrPagination)
    {
        $nextPreIcons =  [
            "none" => 'None',
            "arrow" => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16px" height="16px">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>',
            "chevron" => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16px" height="16px">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>',
            "chevron-double" => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16px" height="16px"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>',
        ];
        $icon =   $nextPreIcons[$attrPagination['iconName'] ?? "arrow"];

        $nextText =  $attrPagination['nextText'] ?? "";
        $previousIcon =  $attrPagination['previousIcon'] ?? "";

        $nextHtml = !empty($nextText) ? '<span>' . $nextText . '</span>' . $icon : $icon;
        $prevHtml = !empty($previousIcon) ? '<span>' . $previousIcon . '</span>' . $icon : $icon;


        $total_pages = $custom_query->max_num_pages;
        $big = 999999999; // need an unlikely integer
        if ($total_pages > 1) {
            $current_page = max(1, get_query_var('paged'));
            echo paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => $current_page,
                'total' => $total_pages,
                'next_text' => $nextHtml,
                'prev_text' => $prevHtml
            ));
        }
    }
}
