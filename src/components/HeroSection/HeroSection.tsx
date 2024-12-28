import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import sliderImage1 from "@/assets/images/basketball.jpg";
import sliderImage2 from "@/assets/images/Adidas.jpg";
import sliderImage3 from "@/assets/images/benjamin-hershey-qegSxvH9U9Y-unsplash.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // adding slider data to show
  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
      title: "Big Summer Sale!",
      description: "Get up to 50% off on all items",
    },
    {
      id: 2,
      image: sliderImage2,
      title: "Exclusive Offer",
      description: "Buy Adidas Sambas with 15% Off",
    },
    {
      id: 3,
      image: sliderImage3,
      title: "New Arrivals",
      description: "Check out our latest collection",
    },
  ];

  return (
    <div className="relative m-10 w-full p-4 bg-cover bg-center max-w-screen-2xl mx-auto h-[300px] md:h-[400px] lg:h-[500px] mt-6">
      <Carousel
        className="overflow-hidden rounded-lg shadow-lg"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent relative group">
                <CardContent className="flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px] p-0 relative">
                  <img
                    src={slider.image}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                      {slider.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-white mb-4">
                      {slider.description}
                    </p>
                    <Link to="/all-products">
                      <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 md:left-4">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 md:right-4">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default HeroSection;
