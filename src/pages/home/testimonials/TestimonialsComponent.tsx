import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaPlay, FaPause, FaLinkedin, FaTwitter, FaUser } from 'react-icons/fa';
import { MdVerified, MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md';
import { BsTrophy } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { TbBrandWhatsapp } from 'react-icons/tb';
import { FaArrowRight } from 'react-icons/fa';

interface TestimonialStats {
  timeSaved?: string;
  collectionRate?: string;
  memberGrowth?: string;
  clarity?: string;
  stress?: string;
  renewalsCaught?: string;
  wasteCut?: string;
  focus?: string;
  onTrackWeeks?: string;
  overspend?: string;
  goals?: string;
  reconciled?: string;
  planning?: string;
  anxiety?: string;
  goalsFunded?: string;
  progress?: string;
  arguments?: string;
}

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  image: string;
  quote: string;
  stats: TestimonialStats;
  rating: number;
  featured: boolean;
}

const TestimonialsComponent = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Grace Wanjiku',
      title: 'Product designer',
      company: 'Nairobi',
      industry: 'Personal finance',
      image: 'https://i.pinimg.com/736x/96/e3/63/96e3632f40c81f5fb985697f662adfb0.jpg',
      quote:
        'I finally see every subscription in one place. Pairing that with M-Pesa means I am not guessing at month-end anymore—I actually know what is left after bills.',
      stats: { timeSaved: '3 hrs/mo', clarity: '+100%', stress: '-40%' },
      rating: 5,
      featured: true,
    },
    {
      id: 2,
      name: 'Brian Omondi',
      title: 'Software engineer',
      company: 'Remote',
      industry: 'Subscriptions',
      image: 'https://i.pinimg.com/1200x/b0/bc/07/b0bc077f04b123595e93e1e05ea8ee5b.jpg',
      quote:
        'Rocket-style subscription visibility, but it speaks M-Pesa. The reminders caught two renewals I would have forgotten—small wins that add up fast.',
      stats: { renewalsCaught: '2/mo', wasteCut: '-18%', focus: '+1' },
      rating: 5,
      featured: false,
    },
    {
      id: 3,
      name: 'Amina Hassan',
      title: 'Teacher',
      company: 'Mombasa',
      industry: 'Budgeting',
      image: 'https://i.pinimg.com/1200x/d2/1f/b2/d21fb26ff8628bee215789569d4d5fba.jpg',
      quote:
        'Budgets used to feel like punishment. Here they feel like guardrails—I set categories once and get a clear picture without living in Excel.',
      stats: { onTrackWeeks: '4/4', overspend: '-25%', goals: '+2' },
      rating: 5,
      featured: false,
    },
    {
      id: 4,
      name: 'Kevin Mutua',
      title: 'Freelancer',
      company: 'Kiambu',
      industry: 'Cash flow',
      image: 'https://i.pinimg.com/736x/ac/00/0a/ac000a2915e49524c511cf4e4cbde131.jpg',
      quote:
        'Irregular income is messy. Having M-Pesa and the bank in one flow stopped the “where did Friday’s payment go?” spiral. I plan the next month with confidence.',
      stats: { reconciled: '99%', planning: 'Weekly', anxiety: '-30%' },
      rating: 5,
      featured: false,
    },
    {
      id: 5,
      name: 'Esther Njeri',
      title: 'Parent',
      company: 'Nakuru',
      industry: 'Saving goals',
      image: 'https://i.pinimg.com/1200x/c0/b2/75/c0b27561ec5a5181f59ae0d187dcc91b.jpg',
      quote:
        'School fees and travel used to live in my head. Named goals with progress bars make it feel achievable—and the whole family can see we are on track.',
      stats: { goalsFunded: '2', progress: '+35%', arguments: '-50%' },
      rating: 5,
      featured: false,
    },
  ];

  const nextTestimonial = (): void => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = (): void => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleAutoPlay = (): void => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play effect
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    
    if (isPlaying) {
      intervalId = setInterval(nextTestimonial, 6000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, activeIndex]);

  return (
    <section className="w-full bg-linear-to-b from-white via-gray-50 to-white py-24 relative overflow-hidden">
      
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-200 h-200 bg-yellow-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-amber-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-225 h-225 border border-yellow-200 rounded-full opacity-30"></div>
        
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${20 + i * 30}%`,
              right: `${5 + i * 10}%`,
              opacity: 0.1
            }}
          >
            <HiOutlineSparkles className="text-yellow-500 text-4xl" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - Matching Image Design */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            What early supporters say about{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-amber-500">
                money clarity
              </span>
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-linear-to-r from-yellow-500 to-amber-500 rounded-full"></div>
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from people who want the same thing: less guesswork, more control.
          </p>
          
          
        </div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Decorative Quote Background */}
          <div className="absolute -top-10 -left-10 opacity-10">
            <FaQuoteLeft className="text-7xl text-yellow-500" />
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <FaQuoteLeft className="text-7xl text-yellow-500 transform rotate-180" />
          </div>
          
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
            {/* Featured Ribbon */}
            {testimonials[activeIndex].featured && (
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-linear-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <BsTrophy className="text-xs" />
                  Featured Story
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-0">
              
              {/* Left Side - Image & Stats */}
              <div className="bg-linear-to-br from-gray-900 to-gray-800 p-8 md:p-10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-yellow-500 shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5">
                      <MdVerified className="text-white text-sm" />
                    </div>
                  </div>
                  
                  <h3 className="text-white text-2xl font-bold mb-1">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-1">{testimonials[activeIndex].title}</p>
                  <p className="text-yellow-400 text-sm font-medium mb-6">{testimonials[activeIndex].company}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {Object.entries(testimonials[activeIndex].stats).map(([key, value]) => (
                      <div key={key} className="bg-white/10 backdrop-blur rounded-lg p-2">
                        <div className="text-yellow-400 text-sm font-bold">{value}</div>
                        <div className="text-gray-400 text-[10px] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/([+-])/g, '')}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                    <span className="text-gray-400 text-xs ml-2">5.0 rating</span>
                  </div>
                  
                  {/* Social Icons */}
                  <div className="flex justify-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:scale-110 transition-all cursor-pointer">
                      <TbBrandWhatsapp className="text-white text-sm" />
                    </div>
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:scale-110 transition-all cursor-pointer">
                      <FaTwitter className="text-white text-sm" />
                    </div>
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:scale-110 transition-all cursor-pointer">
                      <FaLinkedin className="text-white text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Quote */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full mb-4">
                      <FaUser className="text-yellow-500 text-xs" />
                      <span className="text-xs font-medium text-yellow-700">
                        {testimonials[activeIndex].industry}
                      </span>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 bg-gray-100 hover:bg-yellow-500 hover:text-white rounded-full transition-all duration-300"
                    >
                      <MdOutlineArrowBack className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 bg-gray-100 hover:bg-yellow-500 hover:text-white rounded-full transition-all duration-300"
                    >
                      <MdOutlineArrowForward className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={toggleAutoPlay}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-600 transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <FaPause className="text-xs" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <FaPlay className="text-xs" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-linear-to-r from-yellow-500 to-amber-500'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="mt-8">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-yellow-500 to-amber-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              Join Waitlist
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsComponent;