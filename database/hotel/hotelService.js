const fs = require('fs');
const hotelData = require('./hotel.json');
const bookingData = require('./booking.json');

const checkHotel = (name) => {
    return hotelData.find(hotel => hotel.name == name) != undefined ;
}

const getList = () => {
    let hotelList = []

    //ดึงมาเฉพาะข้อมูลบางส่วน
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

const getMyBooking = (username) => {
    return bookingData.filter(booking => booking.username == username)
}

//อัพเดทจำนวนห้องที่ว่าง กับ สถานะของโรงแรม
const updateRoomAmount = (hotel,amount) => {
    //ลบข้อมูลเดิมแล้วใส่ของให่เข้าไป
    let index = hotelData.indexOf(hotel)
    hotelData.splice(index, 1)

    hotel.room.available -= amount
    if(hotel.room.available <= 0){
        hotel.detail.status = "full"
    } else {
        hotel.detail.status = "available"
    }

    hotelData.push(hotel)
    fs.writeFileSync('./database/hotel/hotel.json', JSON.stringify(hotelData));
    return
}

//จองโรงแรม
const createBooking = (username,hotelId,detail) => {
    let hotel = getHotel(hotelId)
    //เช็คจำนวนที่ต้องการจองกับจำนวนห้องที่ว่าง
    if (detail.roomAmount > hotel.room.available){
        return "room amount is not enough"
    }

    updateRoomAmount(hotel,detail.roomAmount)

    let id = bookingData.length+1
    bookingData.push({
        "id": id,
        "username": username,
        "hotelId": hotelId,
        "detail": detail
    })

    fs.writeFileSync('./database/hotel/booking.json', JSON.stringify(bookingData));

    return id
}

const createHotel = (hotel,username) => {
    if(checkHotel(hotel.name)){
        return 'hotel name is already taken'
    }

    if(hotel.room.available <= 0){
        hotel.detail.status = "full"
    } else {
        hotel.detail.status = "available"
    }

    hotel.id = hotelData.length+1
    hotel.createBy = username
    hotelData.push(hotel)
    fs.writeFileSync('./database/hotel/hotel.json', JSON.stringify(hotelData));
    return "success"
}

module.exports = {
    getList,
    getHotel,
    getAvailableHotel,
    getMyBooking,
    createBooking,
    createHotel
};