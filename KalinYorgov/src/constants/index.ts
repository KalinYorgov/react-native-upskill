export const SCREEN_NAMES = {
    HOME: 'Home',
    PRODUCT_LIST: 'ProductList',
    PRODUCT_DETAILS: 'ProductDetails',
    CART: 'Cart',
    ACCOUNT: 'Account',
    ACCOUNT_DRAWER: 'AccountDrawer',
    HELP: 'Help',
    HELP_DESK: 'HelpDesk',
    ORDER_HISTORY: 'OrderHistory',
    LEGAL: 'Legal',
} as const;

export const TAB_NAMES = {
    HOME_TAB: 'HomeTab',
    ACCOUNT_TAB: 'AccountTab',
    CART_TAB: 'CartTab',
    HELP_TAB: 'HelpTab',
    MAIN_TABS: 'MainTabs',
} as const;

export const NAVIGATION_TITLES = {
    HOME: 'Home',
    ACCOUNT: 'Account',
    CART: 'Cart',
} as const;

export const CATEGORY_NAMES = {
    MEN: 'Men\'s Collection',
    WOMEN: 'Women\'s Collection'
} as const;

export const CATEGORIES = {
    MEN_CAT: 'men',
    WOMEN_CAT: 'women',
} as const;

export const WEB_NAVIGATION_EVENTS = {
    ACCOUNT_TAB: 'navigation:AccountTab',
    CART_TAB: 'navigation:CartTab',
} as const;