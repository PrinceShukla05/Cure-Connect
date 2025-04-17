import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(0);
  const [filteredSlots,setFilteredSlots]= useState([]);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    // console.log(docInfo)
  };
  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // console.log(currentDate)
        //continue;
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        // console.log(slotDate)
        // continue
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        // add slot to array
        // timeSlots.push({
        //   datetime: new Date(currentDate),
        //   time: formattedTime
        // })

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      // console.log(docSlots[slotIndex+1][slotTime])
      // console.log(slotIndex)
      console.log(filteredSlots[slotIndex][slotTime].datetime)
      const date =filteredSlots[slotIndex][slotTime].datetime;
      const timee=filteredSlots[slotIndex][slotTime].time;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      //console.log(token)
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, timee },
        { headers: {token} }
      );
      //console.log(data)
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // useEffect(()=>{
  //   console.log(token)
  // })

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
    //console.log(docInfo)
  }, [docInfo]);

  useEffect(() => {
    //console.log(docSlots);
    const a= docSlots.filter((item) => item.length > 0);
    setFilteredSlots(a)
  }, [docSlots]);


  return (
    docInfo && (
      <div>
        {/*------  Doctors Detail ------*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* doc info : name, degree , experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/*Doctor About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*Booking Slots*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 text-gray-700 font-medium">
          <p>Booking Slots</p>
          <div className="element flex gap-3 items-center w-full mt-4 overflow-x-scroll">
            {filteredSlots.map((item, index) => {
              const dateTime = item[0]?.datetime;
              return (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-700"
                  }`}
                  key={index}
                >
                  <p>
                    {dateTime instanceof Date
                      ? daysOfWeek[dateTime.getDay()]
                      : "N/A"}
                  </p>
                  <p>{dateTime instanceof Date ? dateTime.getDate() : "--"}</p>
                </div>
              );
            })}
          </div>

          <div className="element flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {filteredSlots.length &&
              filteredSlots[slotIndex]?.map((item, index) => (
                <p
                  onClick={() => setSlotTime(index)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    index === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  } `}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 mt-3 rounded-full"
          >
            Book an Appointment
          </button>
        </div>
        {/*Listing related doctors*/}

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
