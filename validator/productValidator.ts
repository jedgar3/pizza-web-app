import { Product } from "../model/product"

module.exports.validateProduct = function(product: Product) : string {
    if(product.name.length > 50){
        return "Name Greater Than 50";
    }

    if(product.description.length > 500){
        return "Description Greater Than 500";
    }

    if(product.price < 7.50){
        return "Price Less Than £7.50";
    }

    return null
}