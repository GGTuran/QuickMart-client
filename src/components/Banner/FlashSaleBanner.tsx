import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import flashSaleImage from "@/assets/images/Adidas.jpg";

const FlashSaleBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-cover bg-center max-w-screen-2xl mx-auto h-[300px] md:h-[400px] lg:h-[500px]">
      <Card
        className="bg-transparent relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={() => navigate("/flash-sale")}
      >
        <CardContent className="flex items-center justify-center h-full p-0 relative">
          <img
            src={flashSaleImage}
            className="w-full  md:h-[450px] lg:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
            alt="Flash Sale"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Flash Sale 🚀
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-4">
              Limited time offers, don't miss out!
            </p>
            <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
              View Deals
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashSaleBanner;
