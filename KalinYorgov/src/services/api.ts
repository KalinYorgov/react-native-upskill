import { Product, ProductDetails } from '../types';
import { ServerUnavailableException, UnexpectedException } from '../exceptions/CustomExceptions';
import { request } from './request';
import { formatPrice } from '../utils/price';
import { PRODUCT_API } from './config';
import {
    fetchMasterProductData,
    extractColorMap,
    getUniqueColorVariants,
    fetchVariantsData,
    mapVariantImages,
    createProductVariations,
    extractProductImages,
    createProductDetails
} from '../utils/product';

const pageSize = 20;

export const fetchProducts = async (search: string, page: number): Promise<{ products: Product[], hasMore: boolean }> => {
    const url = `${PRODUCT_API.SEARCH_URL}?q=${encodeURIComponent(search)}&expand=${PRODUCT_API.EXPAND_PARAMS.BASIC}&page=${page}&page_size=${pageSize}`;
    try {
        const data = await request('GET', url);

        if (!data.hits || !Array.isArray(data.hits)) {
            return { products: [], hasMore: false };
        }

        const products = data.hits.map((item: any) => ({
            id: item.product_id,
            uniqueId: `${item.product_id}_${Date.now()}`,
            title: item.product_name,
            thumbnail: item.image?.link || '',
            price: formatPrice(item.price)
        }));

        return { products, hasMore: data.total > page * pageSize };
    } catch (error) {
        console.error(error);
        if (error instanceof ServerUnavailableException) {
            throw error;
        }
        throw new UnexpectedException("Failed to fetch products", { cause: error as Error });
    }
};

export const fetchProductById = async (productId: string): Promise<ProductDetails> => {
    try {
        const masterData = await fetchMasterProductData(productId);
        const productImages = extractProductImages(masterData);
        const uniqueColorVariants = getUniqueColorVariants(masterData);
        const colorMap = extractColorMap(masterData);
        const variantsData = await fetchVariantsData(uniqueColorVariants);
        const variantImageMap = mapVariantImages(variantsData);
        const variations = createProductVariations(uniqueColorVariants, colorMap, variantImageMap);

        return createProductDetails(masterData, productImages, variations);
    } catch (error) {
        throw error;
    }
};
