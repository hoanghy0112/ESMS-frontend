"use client";
import { HiPlus } from "react-icons/hi";

import { useDeleteProductMutation } from "@/api/product/deleteProduct.api";
import viewProductList from "@/api/product/viewProductList.api";
import Button from "@/components/Button/Button";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateProductModal } from "@/components/CreateProductForm/CreateProductFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import PriceRangeFilter from "@/components/PriceRangeFilter/PriceRangeFilter";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import Staff from "@/types/entity/Staff";
import viewStaffList from "@/api/staff/viewStaffList.api";
import { useCreateStaffModal } from "@/components/CreateStaffForm/CreateStaffFormModal";

export default function Page() {
    const searchParams = useSearchParams();

    // const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
    // const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";
    // const price = searchParams.get(SEARCH_PARAMS.price) || "";

    const { openCreateStaffModal } = useCreateStaffModal();
    // const { openUpdateProductModal } = useUpdateProductModal();
    // const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Staff[]>(
        ["staffs", ""],
        viewStaffList,
        {
            retry: false,
        },
    );

    // const deleteProductMutation = useDeleteProductMutation(refetch);

    return (
        <div className="w-full">
            <div className=" w-full grid grid-cols-2">
                <ProductSearch className="" />
                <div className=" flex justify-end gap-8">
                    <Button
                        size="sm"
                        onClick={() => openCreateStaffModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add new staff
                    </Button>
                </div>
            </div>
            <div className=" flex gap-5 mt-10">
                <FilterBadge
                    title="Product name"
                    type="search"
                    searchParamName={SEARCH_PARAMS.staffName}
                />
            </div>
            <p className=" mt-8 mb-4 font-semibold text-yellow-500">
                {data && !isLoading ? `${data.length} items` : "Loading..."}
            </p>
            <DataTable
                data={data || []}
                isLoading={isLoading}
                // onDelete={(product) => {
                //     openClaimModal(
                //         <>
                //             Do you want to delete product{" "}
                //             <span>{product.name}</span>
                //         </>,
                //         (confirm) =>
                //             confirm && deleteProductMutation.mutate(product),
                //     );
                // }}
                // onEdit={(product) => {
                //     openUpdateProductModal(product.id, refetch);
                // }}
                pick={{
                    name: { title: "Name" },
                    email: {
                        title: "Email",
                        className: " font-normal text-secondary-500",
                    },
                    phone: {
                        title: "Phone number",
                        className: " font-normal text-secondary-500",
                    },
                    citizenId: {
                        title: "Citizen ID",
                        className: " font-normal text-secondary-500",
                    },
                    lastOnline: {
                        title: "Last online",
                        className: " font-normal text-secondary-500",
                        mapper: FORMATTER.toShortDate,
                    },

                    // category: { title: "Category" },
                    // price: {
                    //     title: "Price",
                    //     className: " font-normal text-secondary-500",
                    //     mapper: FORMATTER.toCurrency,
                    // },
                    // quantity: {
                    //     title: "Quantity",
                    //     mapper: (value: number) => value || "0",
                    // },
                    // modifiedDate: {
                    //     title: "Last update",
                    //     className: " font-normal text-secondary-500",
                    //     mapper: FORMATTER.toShortDate,
                    // },
                    // warrantyPeriod: {
                    //     title: "Warranty period",
                    //     mapper: (value: number) => `${value} months`,
                    // },
                }}
            />
        </div>
    );
}
