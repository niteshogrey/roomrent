import { IoMdHome } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";


const NavigationBar = () => {
  return (
    <div>
        <div className="fixed bottom-0 left-0 h-20 w-full bg-blue-950 rounded-t-3xl lg:hidden">
        <ul className="flex justify-between items-center px-6 h-full">
          <li className="flex flex-col items-center">
            <a href="/" className="flex flex-col items-center text-white">
              <IoMdHome className="text-2xl" />
              Home
            </a>
          </li>
          <li className="">
            <a href="/addhotel" className="flex flex-col items-center text-white">
              <FiPlusCircle className="text-2xl" />
              Add
            </a>
          </li>
          <li className="">
            <a href="/" className="flex flex-col items-center text-white">
              <IoIosHeartEmpty className="text-2xl" />
              Shortlist
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationBar