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
import { useNavigate } from 'react-router-dom';

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
  hoverColor?: string;
}

const navElements: navProps[] = [
  { 
    title: "Features", 
    href: "#", 
    icon: <BiCategory />,
    hoverColor: "purple",
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
    hoverColor: "green",
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
    hoverColor: "amber",
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
  
  const navigate = useNavigate();
  
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  const handleNavigateToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/oauth/login");
  }

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

  useEffect(() => {
    const handleClickOutsideMobile = (event: MouseEvent) => {
      if (isMobileMenuOpen && 
          sidebarRef.current && 
          mobileHeaderRef.current &&
          !sidebarRef.current.contains(event.target as Node) && 
          !mobileHeaderRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      
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
    setOpenDropdown(null); 
  };

  // Uniform hover class for main nav links (yellow theme)
  const getUniformHoverClass = () => {
    return 'hover:text-yellow-600 transition-colors duration-200 cursor-pointer';
  };

  // Different hover colors for dropdown items based on category
  const getDropdownItemHoverClass = (color?: string) => {
    switch(color) {
      case 'purple':
        return 'hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200';
      case 'green':
        return 'hover:bg-green-50 hover:text-green-700 hover:border-green-200';
      case 'amber':
        return 'hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200';
      default:
        return 'hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200';
    }
  };

  const getBorderTopClass = (color?: string) => {
    switch(color) {
      case 'purple':
        return 'border-t-purple-500';
      case 'green':
        return 'border-t-green-500';
      case 'amber':
        return 'border-t-amber-500';
      default:
        return 'border-t-yellow-500';
    }
  };

  if (isMobile) {
    return (
      <>
        <div ref={mobileHeaderRef} className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white shadow-md z-50">
          <div className="flex items-center">
            <span className="text-xl text-yellow-500 font-bold">Verso</span>
            <span className="text-xl font-bold text-gray-900">Paid</span>
          </div>
          <button 
            onClick={handleMobileMenuToggle}
            className="text-2xl text-gray-600 hover:text-yellow-600 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 cursor-pointer"
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
              <span className="text-xl text-yellow-500 font-bold">Verso</span>
              <span className="text-xl font-bold text-gray-900">Paid</span>
            </div>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {navElements.map((element) => (
              <div key={element.title} className="border-b border-gray-100">
                {element.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown(element.title, e)}
                      className={`mobile-dropdown-btn w-full flex items-center justify-between p-4 text-gray-700 ${getUniformHoverClass()}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${
                          element.hoverColor === 'purple' ? 'text-purple-500' :
                          element.hoverColor === 'green' ? 'text-green-500' :
                          element.hoverColor === 'amber' ? 'text-amber-500' :
                          'text-yellow-500'
                        }`}>
                          {element.icon}
                        </span>
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
                            className={`flex items-start gap-3 p-3 pl-12 text-sm text-gray-600 transition-colors ${getDropdownItemHoverClass(element.hoverColor)} cursor-pointer`}
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item.image ? (
                              <div className={`w-8 h-8 shrink-0 rounded-lg bg-white shadow-sm p-0 flex items-center justify-center overflow-hidden border ${
                                element.hoverColor === 'purple' ? 'border-purple-200' :
                                element.hoverColor === 'green' ? 'border-green-200' :
                                element.hoverColor === 'amber' ? 'border-amber-200' :
                                'border-yellow-200'
                              }`}>
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <span className={`mt-1 text-lg w-8 h-8 flex items-center justify-center ${
                                element.hoverColor === 'purple' ? 'text-purple-500' :
                                element.hoverColor === 'green' ? 'text-green-500' :
                                element.hoverColor === 'amber' ? 'text-amber-500' :
                                'text-yellow-500'
                              }`}>
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
                    className={`flex items-center gap-3 p-4 text-gray-700 ${getUniformHoverClass()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-yellow-500">{element.icon}</span>
                    <span>{element.title}</span>
                  </a>
                )}
              </div>
            ))}

            <div className="p-4">
              <button
                onClick={handleNavigateToLogin}
                className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg transition-colors cursor-pointer font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="flex justify-center items-center gap-4 p-4 w-full">
      <nav 
        ref={desktopNavRef}
        className="flex justify-center items-center gap-4 p-4 rounded-4xl shadow-md shadow-gray-600/40 w-[90%] lg:w-[80%] border-2 border-gray-500/20 fixed bg-white z-50 mt-16"
      >
        <div className="flex flex-1 justify-start items-start">
          <span className="text-xl text-yellow-500 font-bold">Verso</span>
          <span className="text-xl font-bold text-gray-900">Paid</span>
        </div>

        <div className="flex flex-1 justify-end items-end gap-4">
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
                      className={`px-3 py-2 flex items-center gap-1 text-sm lg:text-base ${
                        openDropdown === element.title 
                          ? element.hoverColor === 'purple' ? 'text-purple-600' :
                            element.hoverColor === 'green' ? 'text-green-600' :
                            element.hoverColor === 'amber' ? 'text-amber-600' :
                            'text-yellow-600'
                          : 'text-gray-600'
                      } ${getUniformHoverClass()}`}
                    >
                      <span>{element.title}</span>
                      <FaChevronDown className={`text-xs transition-transform ${openDropdown === element.title ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {openDropdown === element.title && (
                      <div 
                        className={`absolute left-0 top-full mt-10 bg-white rounded-b-lg shadow-xl border-t-2 ${getBorderTopClass(element.hoverColor)} py-6 z-50`}
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
                              className={`flex items-start gap-3 p-3 text-sm rounded-lg transition-all duration-200 group cursor-pointer ${
                                element.hoverColor === 'purple' ? 'hover:bg-purple-50' :
                                element.hoverColor === 'green' ? 'hover:bg-green-50' :
                                element.hoverColor === 'amber' ? 'hover:bg-amber-50' :
                                'hover:bg-yellow-50'
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.image ? (
                                <div className={`w-10 h-10 shrink-0 rounded-xl bg-white shadow-md transition-all duration-200 overflow-hidden flex items-center justify-center border border-gray-100 ${
                                  element.hoverColor === 'purple' ? 'group-hover:shadow-purple-200/50 group-hover:border-purple-200' :
                                  element.hoverColor === 'green' ? 'group-hover:shadow-green-200/50 group-hover:border-green-200' :
                                  element.hoverColor === 'amber' ? 'group-hover:shadow-amber-200/50 group-hover:border-amber-200' :
                                  'group-hover:shadow-yellow-200/50 group-hover:border-yellow-200'
                                }`}>
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <span className={`text-xl w-10 h-10 flex items-center justify-center transition-colors ${
                                  element.hoverColor === 'purple' ? 'text-purple-500 group-hover:text-purple-600' :
                                  element.hoverColor === 'green' ? 'text-green-500 group-hover:text-green-600' :
                                  element.hoverColor === 'amber' ? 'text-amber-500 group-hover:text-amber-600' :
                                  'text-yellow-500 group-hover:text-yellow-600'
                                }`}>
                                  {item.icon}
                                </span>
                              )}
                              <div className="flex-1">
                                <div className={`font-semibold transition-colors ${
                                  element.hoverColor === 'purple' ? 'group-hover:text-purple-700' :
                                  element.hoverColor === 'green' ? 'group-hover:text-green-700' :
                                  element.hoverColor === 'amber' ? 'group-hover:text-amber-700' :
                                  'group-hover:text-yellow-700'
                                }`}>
                                  {item.title}
                                </div>
                                {item.description && (
                                  <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                        
                        <div className={`mt-4 pt-4 border-t border-gray-100 px-6`}>
                          <a 
                            href={`#${element.title.toLowerCase()}`}
                            className={`text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                              element.hoverColor === 'purple' ? 'text-purple-600 hover:text-purple-800' :
                              element.hoverColor === 'green' ? 'text-green-600 hover:text-green-800' :
                              element.hoverColor === 'amber' ? 'text-amber-600 hover:text-amber-800' :
                              'text-yellow-600 hover:text-yellow-800'
                            }`}
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
                    className={`px-3 py-2 text-gray-600 block text-sm lg:text-base ${getUniformHoverClass()}`}
                  >
                    {element.title}
                  </a>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleNavigateToLogin}
            className="flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 px-4 py-1.5 rounded-3xl font-semibold text-white transition-all duration-300 hover:scale-105 text-sm lg:text-base cursor-pointer shadow-md"
          >
            Login
          </button>
        </div>
      </nav>
    </section>
  );
};

export default NavbarComponent;