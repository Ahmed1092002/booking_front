import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Hotel as HotelIcon,
  Shield,
  Sparkles,
  Award,
  Globe,
  HeartHandshake,
  Check,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-blue-600">
        {/* Animated blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 text-center px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white shadow-2xl">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-bold tracking-wider">
                WELCOME TO TRAVELHUB
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
                Find Your
                <br />
                <span className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  Dream Stay
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-white/95 font-light max-w-3xl mx-auto drop-shadow-lg">
                Book amazing hotels worldwide with the best prices guaranteed
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
              <Link href="/hotels">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-50 px-12 h-16 text-lg font-black shadow-2xl hover:scale-105 transition-all rounded-2xl"
                  icon={<Search className="h-6 w-6" />}
                >
                  Explore Hotels
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-transparent border-3 border-white text-white hover:bg-white/10 px-12 h-16 text-lg font-black backdrop-blur-sm rounded-2xl"
                  icon={<ArrowRight className="h-6 w-6" />}
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto">
            <path
              fill="#ffffff"
              d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: HotelIcon,
                value: "15,000+",
                label: "Hotels",
                gradient: "from-blue-500 to-cyan-400",
              },
              {
                icon: Globe,
                value: "5M+",
                label: "Guests",
                gradient: "from-purple-500 to-pink-400",
              },
              {
                icon: MapPin,
                value: "200+",
                label: "Countries",
                gradient: "from-green-500 to-emerald-400",
              },
              {
                icon: Award,
                value: "4.9★",
                label: "Rating",
                gradient: "from-orange-500 to-amber-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group transform hover:scale-110 transition-transform duration-300"
              >
                <div
                  className={`inline-flex p-6 bg-gradient-to-br ${stat.gradient} rounded-3xl mb-4 shadow-xl group-hover:shadow-2xl transition-shadow`}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg md:text-xl text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Top Destinations
            </h2>
            <p className="text-2xl text-gray-600">
              Explore the world's most amazing cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                city: "Paris",
                country: "France",
                hotels: "3,245",
                gradient: "from-rose-500 to-pink-600",
              },
              {
                city: "Tokyo",
                country: "Japan",
                hotels: "4,189",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                city: "Bali",
                country: "Indonesia",
                hotels: "2,458",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                city: "Dubai",
                country: "UAE",
                hotels: "1,947",
                gradient: "from-orange-500 to-red-600",
              },
            ].map((dest, i) => (
              <Link href={`/hotels?city=${dest.city}`} key={i}>
                <div
                  className={`group relative overflow-hidden rounded-3xl aspect-[3/4] bg-gradient-to-br ${dest.gradient} cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3`}
                >
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 2px, transparent 2px)",
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      <div className="text-base font-bold opacity-90 mb-2 tracking-wide">
                        {dest.country.toUpperCase()}
                      </div>
                      <h3 className="text-5xl font-black mb-4 drop-shadow-lg">
                        {dest.city}
                      </h3>
                      <div className="flex items-center gap-2 text-lg font-semibold bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex">
                        <HotelIcon className="h-5 w-5" />
                        <span>{dest.hotels} hotels</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Why Travelers Love Us
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for the perfect booking experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                desc: "Your transactions are protected with bank-level encryption and fraud protection",
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50",
                items: ["256-bit SSL", "PCI Compliant", "Money-back guarantee"],
              },
              {
                icon: Star,
                title: "Best Price Match",
                desc: "Find a better deal? We'll match it and give you an extra 10% off your next stay",
                gradient: "from-amber-500 to-orange-500",
                bg: "bg-orange-50",
                items: ["Price matching", "Exclusive deals", "Loyalty rewards"],
              },
              {
                icon: HeartHandshake,
                title: "24/7 Support",
                desc: "Our friendly support team is always available to help with your bookings",
                gradient: "from-purple-500 to-pink-500",
                bg: "bg-purple-50",
                items: ["Live chat", "Phone support", "Email support"],
              },
            ].map((feature, i) => (
              <div key={i} className="group">
                <div
                  className={`${feature.bg} p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full`}
                >
                  <div
                    className={`inline-flex p-5 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    {feature.desc}
                  </p>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-10 w-10 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              "The best hotel booking experience I've ever had. Simple, fast,
              and reliable!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-black">
                S
              </div>
              <div className="text-left">
                <div className="font-bold text-xl text-gray-900">
                  Sarah Mitchell
                </div>
                <div className="text-gray-600">Frequent Traveler</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-gradient-to-br from-orange-500 via-orange-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white mb-8">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-bold">
              JOIN 5 MILLION+ HAPPY TRAVELERS
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 drop-shadow-2xl">
            Ready to Explore?
          </h2>
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-3xl mx-auto font-light">
            Your next adventure is just a click away
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/hotels">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-50 px-14 h-20 text-2xl font-black shadow-2xl hover:scale-105 transition-all rounded-2xl"
                icon={<Search className="h-7 w-7" />}
              >
                Browse Hotels
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-transparent border-3 border-white text-white hover:bg-white/10 px-14 h-20 text-2xl font-black backdrop-blur-sm rounded-2xl"
                icon={<ArrowRight className="h-7 w-7" />}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
