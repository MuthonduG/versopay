import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { title: "Learn more", href: "#solutions" },
  { title: "M-Pesa", href: "#integrations" },
  { title: "Contact", href: "#contact" },
]

const NavbarComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const mobileHeaderRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleNavigateToLogin = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/oauth/login")
  }

  const handleNavigateToRegister = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/oauth/register")
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        mobileHeaderRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !mobileHeaderRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  if (isMobile) {
    return (
      <>
        <div
          ref={mobileHeaderRef}
          className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-white border-b border-gray-100 z-50"
        >
          <span className="text-lg font-bold">
            <span className="text-yellow-500">Verso</span>
            <span className="text-gray-900">Paid</span>
          </span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden
          />
        )}

        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-200 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="pt-14 px-4 pb-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="block py-3 px-2 text-gray-700 hover:text-yellow-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
            <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleNavigateToLogin}
                className="w-full py-2.5 text-center text-gray-700 font-medium hover:text-yellow-600 transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleNavigateToRegister}
                className="w-full py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-lg font-bold">
          <span className="text-yellow-500">Verso</span>
          <span className="text-gray-900">Paid</span>
        </a>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-gray-700 hover:text-yellow-600 transition-colors text-sm font-medium"
            >
              {link.title}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigateToLogin(e)
            }}
            className="text-gray-700 hover:text-yellow-600 transition-colors text-sm font-medium"
          >
            Sign In
          </a>
          <button
            type="button"
            onClick={handleNavigateToRegister}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  )
}

export default NavbarComponent
