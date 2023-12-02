"use client";

import viewCategoryList from "@/api/category/viewCategoryList";
import updateProductAPI from "@/api/product/updateProduct.api";
import viewDetailProduct from "@/api/product/viewDetailProduct.api";
import Category from "@/types/entity/Category";
import Product from "@/types/entity/Product";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { OperationStateToast } from "../ToastMessage/OperationStateToast";
import { useUpdateProductModal } from "./UpdateProductFormModal";
import UpdateProductFormUI from "./UpdateProductFormUI";
import useLoading from "@/hooks/useLoading";
import Loading from "../Loading/Loading";

export default function UpdateProductForm({ productId }: PropTypes) {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        Category[]
    >(["category"], viewCategoryList);

    const { openLoading, closeLoading } = useLoading();

    const { refetchProductList } = useUpdateProductModal();

    const { data: product, isLoading: isProductLoading } = useQuery<Product>(
        ["product", productId],
        viewDetailProduct,
    );

    const { closeUpdateProductModal } = useUpdateProductModal();

    const { mutate } = useMutation(updateProductAPI, {
        onMutate: () => {
            openLoading("Updating product...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetchProductList?.();
            toast.custom(
                (t) => (
                    <OperationStateToast
                        productName={data?.name || ""}
                        isSuccess
                        content={`Updating product successfully`}
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
            closeUpdateProductModal();
        },
        onError: (error: any, data) => {
            toast.custom(
                (t) => (
                    <OperationStateToast
                        productName={data?.name || ""}
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content={`Fail to update product ${data.name}`}
                        retry={() => mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return (
        <>
            {isProductLoading ? (
                <Loading />
            ) : (
                <UpdateProductFormUI
                    categories={categories}
                    isCategoryLoading={isCategoriesLoading}
                    onSubmitData={(data) => mutate(data)}
                    product={product}
                    isLoading={isProductLoading}
                />
            )}
        </>
    );
}

type PropTypes = {
    productId: string;
};
