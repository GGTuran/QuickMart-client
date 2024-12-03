import AddShopModal from "@/components/Shop/AddShopModal";
import UpdateShopModal from "@/components/Shop/UpdateShopModal";
import { useGetShopByVendorIdQuery } from "@/redux/features/shop/shopApi";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { Toaster } from "react-hot-toast";

const VendorShop = () => {
  const { data } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const person = data?.data;

  const { data: shopByVendor } = useGetShopByVendorIdQuery(person?._id);
  const shop = shopByVendor?.data;

  const { name, logo, description, followers } = shop || {};
  const shopOwner = shop?.vendorId;

  return (
    <div className="m-10">
      <Toaster />
      {/* Conditionally render AddShopModal */}
      {!shop ? (
        <div className="mb-4">
          <AddShopModal />
        </div>
      ) : (
        <>
          {/* Shop Details */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 border-b pb-4">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full border"
            />
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold">{name}</h1>
              <p className="text-sm sm:text-base mt-2">{description}</p>
              <span className="text-sm sm:text-base font-semibold">
                Followers: {followers}
              </span>
            </div>
            <UpdateShopModal id={shop?._id} />
          </div>

          {/* Shop Owner Details */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Shop Owner</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mt-4">
              <div>
                <img
                  src={shopOwner?.image}
                  alt={shopOwner?.name}
                  className="w-15 h-15 sm:w-32 sm:h-32 object-cover rounded-full border"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium">
                  {shopOwner?.name || "N/A"}
                </p>
                <p className="text-sm ">Email: {shopOwner?.email || "N/A"}</p>
                <p className="text-sm ">Phone: {shopOwner?.phone || "N/A"}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorShop;
