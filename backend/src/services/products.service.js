const productsRepo = require("../repos/products.repo");
const AppError = require("./utils/appError");

const getAllProducts = async (query = {}) => {
    const {
        search,
        q,
        location,
        city,
        country,
        brand,
        brandId,
        category,
        categoryId,
        host,
        hostId,
        seller,
        sellerId,
        condition,
        size,
        color,
        status,
        active,
        isActive,
        minPrice,
        maxPrice,
        sortBy = "createdAt",
        order = "desc",
        page,
        limit,
        offset,
    } = query;

    const filters = {
        search: (search || q || "").trim() || undefined,
        location: (location || city || country || "").trim() || undefined,
        brand: brand ? brand.trim() : undefined,
        brandId: brandId ? brandId.trim() : undefined,
        category: category ? category.trim() : undefined,
        categoryId: categoryId ? categoryId.trim() : undefined,
        host: (host || seller || "").trim() || undefined,
        sellerId: (sellerId || hostId || "").trim() || undefined,
        condition: condition ? condition.trim() : undefined,
        size: size ? size.trim() : undefined,
        color: color ? color.trim() : undefined,
        status: status ? status.trim() : undefined,
    };

    const rawActive = isActive !== undefined ? isActive : active;
    if (rawActive === "true" || rawActive === true) {
        filters.isActive = true;
    } else if (rawActive === "false" || rawActive === false) {
        filters.isActive = false;
    }

    if (minPrice !== undefined && minPrice !== "") {
        const parsedMin = parseFloat(minPrice);
        if (!Number.isNaN(parsedMin)) filters.minPrice = parsedMin;
    }

    if (maxPrice !== undefined && maxPrice !== "") {
        const parsedMax = parseFloat(maxPrice);
        if (!Number.isNaN(parsedMax)) filters.maxPrice = parsedMax;
    }

    const allowedSortFields = ["createdAt", "updatedAt", "title", "viewsCount", "price"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = String(order).toLowerCase() === "asc" ? "asc" : "desc";

    let skip;
    let take;
    if (offset !== undefined || page !== undefined || limit !== undefined) {
        const limitNum = Math.max(1, parseInt(limit, 10) || 20);
        take = limitNum;

        if (offset !== undefined && offset !== "") {
            skip = Math.max(0, parseInt(offset, 10) || 0);
        } else {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            skip = (pageNum - 1) * limitNum;
        }
    }

    const { products, total } = await productsRepo.findAll({
        filters,
        sortBy: sortField,
        order: sortOrder,
        skip,
        take,
    });

    const result = { products };
    if (take !== undefined) {
        const currentSkip = skip || 0;
        const pageNum = Math.floor(currentSkip / take) + 1;
        result.pagination = {
            total,
            page: pageNum,
            limit: take,
            offset: currentSkip,
            totalPages: Math.ceil(total / take),
        };
    }

    return result;
};

const getDeletedProducts = async (query = {}) => {
    const search = (query.search || query.q || "").trim() || undefined;
    const products = await productsRepo.findDeleted({ search });
    return products;
};

const getProductById = async id => {
    const product = await productsRepo.findById(id);
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const createProduct = async productData => {
    return await productsRepo.create(productData);
};

const updateProduct = async (id, productData) => {
    const product = await productsRepo.update(id, productData);
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const patchProduct = async (id, productData) => {
    const product = await productsRepo.patch(id, productData);
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const activateProduct = async id => {
    const product = await productsRepo.patch(id, { isActive: true });
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const deactivateProduct = async id => {
    const product = await productsRepo.patch(id, { isActive: false });
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const softDeleteProduct = async id => {
    const product = await productsRepo.softDelete(id);
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const getProductBySlug = async slug => {
    const product = await productsRepo.findBySlug(slug);
    if (!product) {
        throw new AppError("Producto no encontrado", 404);
    }
    return product;
};

const restoreProduct = async id => {
    const product = await productsRepo.restore(id);
    if (!product) {
        throw new AppError("Producto no encontrado o no estaba eliminado", 404);
    }
    return product;
};

module.exports = {
    getAllProducts,
    getDeletedProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    patchProduct,
    activateProduct,
    deactivateProduct,
    softDeleteProduct,
    restoreProduct,
};
