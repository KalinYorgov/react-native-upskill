// API Configuration
export const API_BASE_URL = process.env.API_BASE_URL || 'https://dummyjson.com';

export const API_ENDPOINTS = {
    PRODUCT_SEARCH: `${API_BASE_URL}/products/search`,
    PRODUCT_BY_ID: `${API_BASE_URL}/products`,
};

// OCAPI Configuration
export const OCAPI_INSTANCE_HOST = process.env.OCAPI_INSTANCE_HOST;
export const OCAPI_SITE = process.env.OCAPI_SITE;
export const OCAPI_VERSION = process.env.OCAPI_VERSION;
export const OCAPI_CLIENT_ID = process.env.OCAPI_CLIENT_ID;
export const ORIGIN = OCAPI_INSTANCE_HOST?.replace('/s/', '') || '';

export const ocapiUrl = `${OCAPI_INSTANCE_HOST}${OCAPI_SITE}/dw/shop/${OCAPI_VERSION}`;
export const helpDeskUrl = process.env.HELP_DESK_URL;
export const STOREFRONT_ORDER_HISTORY = `${OCAPI_INSTANCE_HOST}${OCAPI_SITE}/orders`;
export const STOREFRONT_CONTACT_US = `${ORIGIN}on/demandware.store/Sites-${OCAPI_SITE}-Site/en_US/ContactUs-Landing`;

// Image CDN configurations
export const IMAGE_CDN = {
    EDGE_BASE: process.env.CDN_EDGE_BASE,
    DX_BASE: process.env.CDN_DX_BASE,
    COMMON_PATH: '/on/demandware.static/-/Sites-apparel-m-catalog/default',
    IMAGE_API_PATH: process.env.CDN_IMAGE_API_PATH,
    PRODUCT_PATHS: {
        LARGE: '/images/large',
        MEDIUM: '/images/medium',
        SMALL: '/images/small',
        SWATCH: '/images/swatch'
    } as const
} as const;

type ProductViewType = keyof typeof IMAGE_CDN.PRODUCT_PATHS;

// Helper functions to construct image URLs
export const constructImageUrl = (imagePath: string, useEdgeServer = false) => {
    const baseUrl = useEdgeServer ? IMAGE_CDN.EDGE_BASE : IMAGE_CDN.DX_BASE;
    const apiPath = useEdgeServer ? IMAGE_CDN.IMAGE_API_PATH : '';
    return `${baseUrl}${apiPath}${IMAGE_CDN.COMMON_PATH}${imagePath}`;
};

export const constructProductImageUrl = (productId: string, viewType: ProductViewType, imageIndex: string = '0', useEdgeServer = false) => {
    const imagePath = `${IMAGE_CDN.PRODUCT_PATHS[viewType]}/${productId}${imageIndex}.jpg`;
    return constructImageUrl(imagePath, useEdgeServer);
};

// Product API configurations
export const PRODUCT_API = {
    BASE_URL: `${ocapiUrl}/products`,
    SEARCH_URL: `${ocapiUrl}/product_search`,
    EXPAND_PARAMS: {
        FULL: 'images,variations,prices',
        BASIC: 'images,prices'
    }
} as const;

// Example usage:
// dis_base_link = constructImageUrl('/images/large/B0574220_CP1_0.jpg', true);
// link = constructImageUrl('/images/large/B0574220_CP1_0.jpg', false);
