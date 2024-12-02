import { useAppDispatch } from "@/redux/hooks";
import "./index.css";
import WheelComponent from "./WheelComponent";
import { setCouponCode } from "@/redux/features/coupon/couponSlice";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import CouponModal from "../CouponModal/CouponModal";

const Wheel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const segments = [
    "better luck next time",
    "won 10%",
    "won 20%",
    "better luck next time",
    "won 30%",
    "won uber pass",
    "better luck next time",
    "won a voucher",
    "won 10%",
    "won 20%",
    "better luck next time",
    "won 30%",
    "won uber pass",
    "better luck next time",
    "won a voucher",
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner: string) => {
    // console.log(winner);
     
  // Extract the discount value from the segment text
  const discountMatch = winner.match(/(\d+)%/);

  if (discountMatch) {
    // If a valid discount percentage is found, set it as the coupon code
    const discountValue = discountMatch[1];
    dispatch(setCouponCode(discountValue)); // Store the percentage without the '%' sign
    toast.success(winner);
    setIsModalOpen(true);
  } else {
    // If not a valid discount, handle it accordingly
    toast.success(winner);
  }
  };
  return (
    <div className="wheel-container">
       <h2 className="text-3xl font-medium mb-4">Spin to Win: Discover Your Discount!</h2>
     <Toaster/>
     <div className="wheel-modal-container">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={segments[3]}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={140}
          upDuration={100}
          downDuration={1000}
        />
      <div>
      <CouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      </div>
     
    </div>
  );
};

export default Wheel;
