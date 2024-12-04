import { TProduct } from "@/types/product.interface";

export const addToViewedProducts = (product: TProduct) => {
    let viewedProducts = JSON.parse(localStorage.getItem("recentProducts") || "[]");

    // Check if the product is already in the list
    viewedProducts = viewedProducts.filter(
        (p: TProduct) => p._id !== product._id
    );

    // Add the new product at the beginning of the list
    viewedProducts.unshift(product);

    // Limit the list to the last 10 products
    if (viewedProducts.length > 10) {
        viewedProducts.pop(); // Remove the last product if the list exceeds 10
    }

    // Save the updated list back to localStorage
    localStorage.setItem("recentProducts", JSON.stringify(viewedProducts));
};
