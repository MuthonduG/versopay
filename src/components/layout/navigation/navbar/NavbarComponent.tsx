import { type ReactElement, useState, useEffect, useRef } from 'react'
import { FaToolbox, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { LiaQuestionSolid } from "react-icons/lia";
import { VscOrganization } from "react-icons/vsc";
import { MdPayments, MdAnalytics, MdWhatsapp, MdSms } from "react-icons/md";
import { BsReceipt } from "react-icons/bs";
import { GiBank } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { TbSubtask } from "react-icons/tb";
import { PiMoneyFill } from "react-icons/pi";
import mpesa_logo from "../../../../assets/mpesa.png";
import momo_logo from "../../../../assets/momo.png";
import kcb_logo from "../../../../assets/kcb.png";
import sib_logo from "../../../../assets/sib.png";
import airtel_logo from "../../../../assets/airtel.png";
import equity_logo from "../../../../assets/equity.png";

interface dropdownItem {
  title: string;
  href: string;
  icon?: ReactElement;
  image?: string;
  description?: string;
}

interface navProps {
  title: string;
  href: string;
  icon?: ReactElement;
  dropdown?: dropdownItem[];
}

const navElements: navProps[] = [
  { 
    title: "Features", 
    href: "#", 
    icon: <BiCategory />,
    dropdown: [
      { 
        title: "MPesa Payments", 
        href: "#features/mpesa-payments", 
        icon: <MdPayments />,
        description: "Accept payments via MPesa seamlessly"
      },
      { 
        title: "Bank Payments", 
        href: "#features/bank-payments", 
        icon: <GiBank />,
        description: "Direct bank transfers and payments"
      },
      { 
        title: "Analytics", 
        href: "#features/analytics", 
        icon: <MdAnalytics />,
        description: "Real-time insights and reports"
      },
      { 
        title: "Reconciliations", 
        href: "#features/reconciliations", 
        icon: <BsReceipt />,
        description: "Automated transaction matching"
      },
      { 
        title: "Real-time WhatsApp", 
        href: "#features/whatsapp", 
        icon: <MdWhatsapp />,
        description: "Instant WhatsApp notifications"
      },
      { 
        title: "SMS Notifications", 
        href: "#features/sms", 
        icon: <MdSms />,
        description: "Real-time SMS alerts"
      },
    ]
  },
  { 
    title: "Solutions", 
    href: "#", 
    icon: <FaToolbox />,
    dropdown: [
      { 
        title: "MPesa & Bank Reconciliations", 
        href: "#solutions/reconciliations", 
        icon: <BsReceipt />,
        description: "Automated reconciliation for MPesa and banks"
      },
      { 
        title: "Group / Customer Management", 
        href: "#solutions/customer-management", 
        icon: <BsPeopleFill />,
        description: "Manage groups and customers efficiently"
      },
      { 
        title: "Subscription Management", 
        href: "#solutions/subscription-management", 
        icon: <TbSubtask />,
        description: "Handle recurring payments and subscriptions"
      },
    ]
  },
  { 
    title: "Integrations", 
    href: "#", 
    icon: <PiMoneyFill />,
    dropdown: [
      { 
        title: "MPesa", 
        href: "#integrations/mpesa", 
        image: mpesa_logo,
        description: "Integrate with MPesa API"
      },
      { 
        title: "Airtel Money", 
        href: "#integrations/airtel", 
        image: airtel_logo,
        description: "Airtel Money payment integration"
      },
      { 
        title: "Momo Money", 
        href: "#integrations/momo", 
        image: momo_logo,
        description: "MTN Momo payment integration"
      },
      { 
        title: "KCB", 
        href: "#integrations/kcb", 
        image: kcb_logo,
        description: "KCB bank integration"
      },
      { 
        title: "Equity", 
        href: "#integrations/equity", 
        image: equity_logo,
        description: "Equity bank integration"
      },
      { 
        title: "SIB", 
        href: "#integrations/sib", 
        image: sib_logo,
        description: "SIB bank integration"
      },
    ]
  },
  { title: "Why VersoPaid", href: "#", icon: <VscOrganization /> },
  { title: "FAQs", href: "#", icon: <LiaQuestionSolid /> },
]

const NavbarComponent = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for click outside detection
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside for desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Handle click outside for mobile sidebar
  useEffect(() => {
    const handleClickOutsideMobile = (event: MouseEvent) => {
      // Close sidebar if clicking outside
      if (isMobileMenuOpen && 
          sidebarRef.current && 
          mobileHeaderRef.current &&
          !sidebarRef.current.contains(event.target as Node) && 
          !mobileHeaderRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      
      // Close dropdowns in sidebar if clicking outside the current dropdown
      if (openDropdown) {
        const target = event.target as Element;
        if (!target.closest('.mobile-dropdown-btn') && !target.closest('.mobile-dropdown-content')) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMobile);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobile);
    };
  }, [isMobileMenuOpen, openDropdown]);

  const toggleDropdown = (title: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null); // Close any open dropdowns when toggling sidebar
  };

  // Mobile Sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div ref={mobileHeaderRef} className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white shadow-md z-50">
          <div className="flex items-center">
            <span className="text-xl text-blue-700 font-bold">Verso</span>
            <span className="text-xl font-bold">Paid</span>
          </div>
          <button 
            onClick={handleMobileMenuToggle}
            className="text-2xl text-gray-600"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center">
              <span className="text-xl text-blue-700 font-bold">Verso</span>
              <span className="text-xl font-bold">Paid</span>
            </div>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {navElements.map((element) => (
              <div key={element.title} className="border-b border-gray-100">
                {element.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown(element.title, e)}
                      className="mobile-dropdown-btn w-full flex items-center justify-between p-4 text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-blue-600">{element.icon}</span>
                        <span>{element.title}</span>
                      </div>
                      <FaChevronDown className={`text-sm transition-transform ${openDropdown === element.title ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {openDropdown === element.title && (
                      <div className="mobile-dropdown-content bg-gray-50">
                        {element.dropdown.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 p-3 pl-12 text-sm text-gray-600 hover:bg-blue-50 transition-colors"
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item.image ? (
                              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-white shadow-sm p-0 flex items-center justify-center overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <span className="text-blue-500 mt-1 text-lg w-8 h-8 flex items-center justify-center">
                                {item.icon}
                              </span>
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{item.title}</div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={element.href}
                    className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-blue-600">{element.icon}</span>
                    <span>{element.title}</span>
                  </a>
                )}
              </div>
            ))}

            {/* Mobile Login Button */}
            <div className="p-4">
              <a 
                href="#" 
                className="block text-center bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Navbar
  return (
    <section className="flex justify-center items-center gap-4 p-4 w-full">
      <nav 
        ref={desktopNavRef}
        className="flex justify-center items-center gap-4 p-4 rounded-4xl shadow-md shadow-gray-600/40 w-[90%] lg:w-[80%] border-2 border-blue-500/5 fixed bg-white z-50 mt-16"
      >
        {/* logo */}
        <div className="flex flex-1 justify-start items-start">
          <span className="text-xl text-blue-700 font-bold">Verso</span>
          <span className="text-xl font-bold">Paid</span>
        </div>

        <div className="flex flex-1 justify-end items-end gap-4">
          {/* navlinks */}
          <div className="flex justify-center items-center gap-1">
            {navElements.map((element) => (
              <div key={element.title} className="relative dropdown-container">
                {element.dropdown ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(element.title);
                      }}
                      className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm lg:text-base"
                    >
                      <span>{element.title}</span>
                      <FaChevronDown className={`text-xs transition-transform ${openDropdown === element.title ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {openDropdown === element.title && (
                      <div 
                        className="absolute left-0 top-full mt-10 bg-white rounded-b-lg shadow-xl border-t-2 border-blue-500 py-6 z-50"
                        style={{
                          width: element.title === "Features" ? "700px" : 
                                 element.title === "Integrations" ? "700px" : "500px",
                          marginLeft: element.title === "Features" ? "-100px" : 
                                      element.title === "Integrations" ? "-100px" : "0"
                        }}
                      >
                        <div className={`
                          grid gap-4 px-6
                          ${element.title === "Features" ? "grid-cols-3" : 
                            element.title === "Integrations" ? "grid-cols-3" : "grid-cols-1"}
                        `}>
                          {element.dropdown.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              className="flex items-start gap-3 p-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.image ? (
                                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white shadow-md group-hover:shadow-lg transition-shadow overflow-hidden flex items-center justify-center border border-gray-100">
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <span className="text-blue-500 text-xl w-10 h-10 flex items-center justify-center">
                                  {item.icon}
                                </span>
                              )}
                              <div className="flex-1">
                                <div className="font-semibold text-gray-800">{item.title}</div>
                                {item.description && (
                                  <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                        
                        {/* Optional footer for dropdown */}
                        <div className="mt-4 pt-4 border-t border-gray-100 px-6">
                          <a 
                            href={`#${element.title.toLowerCase()}`}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            onClick={() => setOpenDropdown(null)}
                          >
                            View all {element.title.toLowerCase()}
                            <span>→</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={element.href}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors block text-sm lg:text-base"
                  >
                    {element.title}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ctas */}
          <div className="flex justify-center items-center bg-blue-700/70 hover:bg-blue-700/90 px-4 py-1.5 rounded-3xl font-semibold text-white transition-colors text-sm lg:text-base">
            <a href="#" className="">
              Login
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavbarComponent;