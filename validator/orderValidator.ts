import { Order } from "../model/order"

module.exports.validateOrder = function(order: Order) : string {
    var today = new Date();
    var oldDate = today;
    oldDate.setFullYear(today.getFullYear() - 1)

    if(order.orderDate < oldDate){
        return "Date is over a year ago";
    }

    return null
}