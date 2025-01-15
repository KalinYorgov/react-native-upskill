import { ProductDetails, ProductVariation, VariationAttribute, VariationAttributeValue } from '../types';
import { request } from '../services/request';
import { ocapiUrl, PRODUCT_API, constructImageUrl } from '../services/config';
import { ImageGroupType, VariantType } from '../types/index';

const parseId = (id: string): number => {
    const numericId = parseInt(id.replace(/\D/g, ''));
    return isNaN(numericId) ? 0 : numericId;
};

const convertViewType = (type: string): 'LARGE' | 'MEDIUM' | 'SMALL' | 'SWATCH' => {
    return type.toUpperCase() as 'LARGE' | 'MEDIUM' | 'SMALL' | 'SWATCH';
};

export const fetchMasterProductData = async (productId: string): Promise<any> => {
    const masterUrl = `${PRODUCT_API.BASE_URL}/${encodeURIComponent(productId)}?expand=${PRODUCT_API.EXPAND_PARAMS.FULL}`;
    return await request('GET', masterUrl);
};

export const extractColorMap = (masterData: any): Map<string, string> => {
    return new Map(
        masterData.variation_attributes?.find((attr: any) => attr.id === 'color')?.values.map((color: any) => [color.value, color.name]) || []
    );
};

export const getUniqueColorVariants = (masterData: any): VariantType[] => {
    return masterData.variants?.filter((variant: VariantType, index: number, self: VariantType[]) =>
        variant.variation_values?.color && self.findIndex(v => v.variation_values?.color === variant.variation_values?.color) === index
    ) || [];
};

export const fetchVariantsData = async (uniqueColorVariants: VariantType[]): Promise<any[]> => {
    const variantIds = uniqueColorVariants.map((variant: VariantType) => variant.product_id);
    if (variantIds.length === 0) {
        return [];
    }
    const variantsUrl = `${ocapiUrl}/products/(${variantIds.join(',')})?expand=images,variations`;
    const variantsResponse = await request('GET', variantsUrl);
    return variantsResponse.data || [];
};

export const mapVariantImages = (variantsData: any[]): Record<string, string> => {
    return variantsData.reduce((acc: Record<string, string>, variant: any) => {
        const imageGroup = variant.image_groups?.find((group: ImageGroupType) => ['small', 'medium', 'swatch'].includes(group.view_type));
        if (imageGroup && imageGroup.images?.[0]) {
            const imagePath = imageGroup.images[0].path;
            acc[variant.id] = constructImageUrl(imagePath);
        }
        return acc;
    }, {});
};

export const createProductVariations = (
    uniqueColorVariants: VariantType[],
    colorMap: Map<string, string>,
    variantImageMap: Record<string, string>
): ProductVariation[] => {
    return uniqueColorVariants.map((variant: VariantType) => {
        return {
            id: parseId(variant.product_id),
            color: colorMap.get(variant.variation_values?.color || '') || '',
            thumbnail: variantImageMap[variant.product_id] || '',
            product_id: variant.product_id
        };
    });
};

export const extractProductImages = (masterData: any): { uri: string }[] => {
    const largeImages = masterData.image_groups?.find((group: ImageGroupType) => group.view_type === 'large')?.images || [];
    return largeImages.map((img: any) => ({
        uri: constructImageUrl(img.path)
    }));
};

export const extractSizes = (masterData: any): string[] => {
    const sizeAttribute = masterData.variation_attributes?.find(
        (attr: VariationAttribute) => attr.id === 'size'
    );

    if (!sizeAttribute) {
        return [];
    }

    const sizes = sizeAttribute.values.map((size: VariationAttributeValue) => size.value);
    return sizes;
};

export const createProductDetails = (
    masterData: any,
    productImages: { uri: string }[],
    variations: ProductVariation[]
): ProductDetails => {
    return {
        id: parseId(masterData.id),
        title: masterData.name,
        description: masterData.page_description || '',
        shortDescription: masterData.short_description || '',
        longDescription: masterData.long_description || '',
        price: masterData.price,
        thumbnail: productImages[0]?.uri || '',
        images: productImages,
        variations,
        sizes: extractSizes(masterData)
    };
};