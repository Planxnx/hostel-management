const hotelData = require('./hotel.json');

const getList = () => {
    let hotelList = []
    for ( hotel of hotelData) {
        hotelList.push({
            name: hotel.name,
            price: hotel.price,
            detail: hotel.detail
        })
    }
    return hotelList
}

module.exports = {
    getList
};