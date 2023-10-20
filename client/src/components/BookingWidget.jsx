/* eslint-disable react/prop-types */
const BookingWidget = ({placeDetails}) => {
  return (
    <div className="">
      <div className="bg-white shadow p-4 rounded-2xl ">
        <div className="text-2xl text-center flex justify-center">
          Price: 
          <h2 className="font-bold">
          ${placeDetails.price}/per night
          </h2>
        </div>
        <div className="flex">
        <div className="my-2 border-2 py-2 px-2 rounded-xl">
          <label>Check in:</label>
          <input type="date"/>
        </div>
        <div className="my-2 border-2 py-2 px-2 rounded-xl">
          <label>Check out:</label>
          <input type="date"/>
        </div>
        </div>
        <div className="py-2 px-2">
          <label>Number of guests</label>
          <input type="number" value={2} />
        </div>
        <button className="border-2 bg-red-500 rounded-full p-2 w-full ">Book This Place</button>
      </div>
    </div>
  )
}

export default BookingWidget
