import header_image_one from "../../../assets/header_main.png";
import { MdOutlineNotifications, MdPayment } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

const HeaderComponent = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center mt-28">

      {/* main content */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-[70%]">

        {/* right side */}
        <div className="flex-1 flex-col justify-center items-center md:justify-end md:items-end p-4 gap-4">
          <span className="text-4xl font-semibold text-blue-700">Re-curring payments and collections made easy</span>
          <p className="text-gray-600 leading-9 mt-8">
            Versopaid is a lightweight reconciliation and subscription management platform built
            specifically for small recurring-collection groups in Kenya. We help organizations track who
            has paid and who hasn’t - automatically - so they don’t have to manually reconcile M-Pesa statements or chase payments.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-14">

            <a href="" className="w-full px-6 p-2 flex justify-center items-center bg-blue-700/80 hover:bg-blue-700/90 transform shadow rounded-full text-white font-semibold transition-all duration-300 hover:scale-105">Join The Waitlist</a>
            <a href="" className="w-full px-6 p-2 flex justify-center items-center bg-gray-700/20 hover:bg-gray-700/25 transform shadow rounded-full font-semibold transition-all duration-300 hover:scale-105">Request Demo</a>

          </div>
        </div>

        {/* left side */}
        <div className="flex-1 md:flex hidden justify-center items-center p-2 relative ">
          <div className="flex justify-center items-center relative h-[400px] w-[400px] mt-12 rounded-2xl shadow-xl overflow-hidden group">
            <img src={header_image_one} alt="Dashboard preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>

          {/* absolute notification card at the right top - positioned to be 25% inside, 75% outside */}
          <div className="absolute -top-6 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 animate-bounce-slow z-10"
               style={{ transform: 'translateX(25%)' }}>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <MdOutlineNotifications className="text-blue-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">NEW PAYMENT</p>
                <p className="text-sm font-semibold text-gray-800 truncate">Jane Njeri</p>
                <p className="text-xs text-gray-600 mt-1 truncate">Paid KES 500 • 2 min ago</p>
              </div>
              <BsCheckCircleFill className="text-green-500 text-lg flex-shrink-0" />
            </div>
            {/* Small indicator pointing to the image */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
          </div>

          {/* absolute card showing a whatsapp message - positioned to be 20% inside, 80% outside */}
          <div className="absolute bottom-12 -left-16 bg-white rounded-2xl shadow-2xl p-4 w-72 animate-slide-in z-10"
               style={{ transform: 'translateX(20%)' }}>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <FaWhatsapp className="text-green-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-gray-500 truncate">VersoPaid • now</p>
                  <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">NEW</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mt-1 truncate">Payment Reminder</p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  Your KES 500 subscription is due tomorrow. Click to pay via M-Pesa
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">Pay Now</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">Remind Later</span>
                </div>
              </div>
            </div>
            {/* Small indicator pointing to the image */}
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
          </div>

          {/* Additional floating payment card - positioned to be 15% inside, 85% outside */}
          <div className="absolute top-16 -right-12 bg-white rounded-xl shadow-2xl p-3 w-48 animate-float z-10"
               style={{ transform: 'translateX(15%)' }}>
            <div className="flex items-center gap-2">
              <MdPayment className="text-blue-500 text-lg flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500 truncate">Total Collections</p>
                <p className="text-sm font-bold text-gray-800 truncate">KES 45,500</p>
                <p className="text-[10px] text-green-600 truncate">↑ 12% from last month</p>
              </div>
            </div>
            {/* Small indicator pointing to the image */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-lg"></div>
          </div>

        </div>

      </div>

      {/* integrations */}

    </header>
  )
}

export default HeaderComponent;