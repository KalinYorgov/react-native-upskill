export const formatPrice = (price: any): string => {
    if (price) {
        if (price.USD?.sales?.value) {
            return `$${price.USD.sales.value.toFixed(2)}`;
        } else if (price.sales?.value) {
            return `$${price.sales.value.toFixed(2)}`;
        } else if (typeof price === 'number') {
            return `$${price.toFixed(2)}`;
        }
    }
    return 'Price not available';
};