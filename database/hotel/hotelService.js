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

const getHotel = (id) => {
    return hotelData.find(hotel => hotel.id == id)
}

const getAvailableHotel = () => {
    return hotelData.filter(hotel => hotel.detail.status == "available")
}

module.exports = {
    getList,
    getHotel,
    getAvailableHotel
};