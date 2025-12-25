import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Hotel as HotelIcon,
  Shield,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your World of{" "}
              <span className="text-secondary-100">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-medium">
              Discover and book amazing hotels around the world with ease and
              confidence
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/hotels">
                <Button
                  size="lg"
                  variant="secondary"
                  icon={<Search className="h-5 w-5" />}
                >
                  Explore Hotels
                </Button>
              </Link>
              <Link href="/register?role=seller">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white/20"
                >
                  List Your Property
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 max-w-3xl mx-auto">
              {[
                { value: "1,000+", label: "Hotels" },
                { value: "50K+", label: "Happy Customers" },
                { value: "100+", label: "Cities" },
                { value: "4.8★", label: "Average Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="mb-4">Why Choose TravelHub</h2>
            <p className="text-lg text-muted-foreground">
              Experience the best in travel booking with our comprehensive
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HotelIcon,
                title: "Wide Selection",
                description:
                  "Choose from thousands of hotels worldwide with detailed information and verified reviews",
              },
              {
                icon: Shield,
                title: "Secure Booking",
                description:
                  "Your bookings are protected with industry-standard security measures and payment protection",
              },
              {
                icon: Zap,
                title: "Instant Confirmation",
                description:
                  "Get immediate booking confirmation and manage your reservations easily from anywhere",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card-base p-8 text-center hover:shadow-md transition-all duration-300 group"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 mb-6 group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-500 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container text-center relative z-10">
          <h2 className="mb-6 text-white">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who trust TravelHub for their
            accommodation needs
          </p>
          <Link href="/hotels">
            <Button
              size="lg"
              className="bg-white text-primary-900 hover:bg-neutral-100 h-14 px-10 text-lg rounded-full shadow-xl"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
            >
              Explore All Hotels
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
