import { Link } from 'react-router-dom';
import NavbarComponent from '../../components/layout/navigation/navbar/NavbarComponent';
import FooterComponent from '../../components/layout/footer/FooterComponent';
import {
  FaArrowRight,
  FaHandshake,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaHeart,
} from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';

const AboutPage = () => {
  const values = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: 'Trust First',
      description:
        'We never hold your funds. VersoPaid integrates with M-Pesa and banks to track payments—your money stays in your control.',
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: 'Built for Groups',
      description:
        'Designed for Chamas, SACCOs, gyms, and schools. We understand recurring collections and the pain of manual reconciliation.',
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: 'Clarity Over Chaos',
      description:
        'Automated matching, defaulter tracking, and audit-ready reports. Know who paid, who owes, and what’s next—without spreadsheets.',
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: 'Kenya-First',
      description:
        'Built in Kenya, for Kenya. M-Pesa, Airtel Money, and local banking integrations from day one.',
    },
  ];

  const stats = [
    { value: '100%', label: 'No funds held' },
    { value: 'Automated', label: 'M-Pesa matching' },
    { value: 'Real-time', label: 'Defaulter tracking' },
    { value: 'Audit-ready', label: 'Reports & exports' },
  ];

  return (
    <section className="flex flex-col min-h-screen w-full bg-white">
      <NavbarComponent />

      {/* Hero */}
      <header
        id="about"
        className="w-full flex flex-col justify-center items-center mt-28 py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-40 left-20 animate-float-slow opacity-10">
            <BsStars className="text-yellow-500 text-6xl" />
          </div>
          <div className="absolute bottom-40 right-20 animate-float-slow opacity-10">
            <HiOutlineSparkles className="text-amber-500 text-6xl" />
          </div>
        </div>

        <div className="relative z-10 w-[90%] lg:w-[70%] text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            We track who has paid and who hasn’t so that{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
              you don’t have to.
            </span>
          </h1>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            VersoPaid is a lightweight reconciliation and subscription management platform built for small recurring-collection groups in Kenya.
          </p>
        </div>
      </header>

      {/* Mission */}
      <section className="w-full py-20 bg-linear-to-b from-white to-amber-50/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 w-[90%] lg:w-[70%] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-tr from-yellow-500 to-amber-500">
                  Mission
                </span>
              </h2>
              <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                We help organizations track contributions automatically—no manual M-Pesa statement reconciliation, no chasing payments. VersoPaid integrates with existing mobile money and banking gateways to provide accurate tracking, reporting, and reminders. We don’t hold customer funds; we make sure you know exactly where yours stands.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-yellow-50 rounded-2xl p-8 border border-amber-100 w-full max-w-md">
                <FaHandshake className="text-yellow-500 text-5xl mb-4" />
                <h3 className="font-bold text-gray-900 text-xl">Trust by design</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Your members pay directly to your M-Pesa till or bank. We only observe and reconcile—never touch the money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-20">
        <div className="w-[90%] lg:w-[70%] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            What we stand for
          </h2>
          <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            Every decision we make is guided by these principles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {values.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-linear-to-tr from-yellow-500 to-amber-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-16 bg-linear-to-b from-amber-50/50 to-white">
        <div className="w-[90%] lg:w-[70%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20">
        <div className="w-[90%] lg:w-[70%] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to stop chasing payments?
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Join Chamas, SACCOs, and groups across Kenya who use VersoPaid to automate reconciliation and focus on what matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              to="/oauth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
            >
              Get Started
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 hover:border-yellow-500 text-gray-700 hover:text-yellow-600 rounded-full font-semibold transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <FooterComponent />
    </section>
  );
};

export default AboutPage;
