// import HistoryMilestones from "@/components/HistoryMilestones/HistoryMilestones";
import Contact from "./Contact";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Michael Scott",
      role: "CEO",
      image: "https://i.ibb.co/LRVq4J0/elegant-businessman-with-document.jpg",
      bio: "Michael is the visionary behind our company. With over 20 years of experience in the industry, he leads our team with a focus on innovation and excellence.",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image:
        "https://i.ibb.co/yV2kQNf/premium-photo-1661590863910-69abf33b8f3f-blend-000000-blend-alpha-10-blend-mode-normal-blend-w-1-cro.jpg",
      bio: "Jane is our technology guru. She is responsible for overseeing all technical aspects and drives our tech strategy forward.",
    },
    {
      name: "Jordan Smith",
      role: "HR",
      image:
        "https://i.ibb.co/GTwG8Cj/jeremy-mcgilvrey-Mum-4d-B0-Vs-E-unsplash.jpg",
      bio: "Jordan is our HR guru. He is responsible for overseeing all human resources aspects and drives our HR strategy forward.",
    },
  ];

  return (
    <div className="mb-10  rounded-2xl min-h-screen">
      <section className="bg-background py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-3xl">
                About QuickMart
              </h2>
              <p className="mt-4 text-muted-foreground">
                QuickMart is a trusted online retailer offering a wide range of
                premium products, established in 2015. With nearly a decade of
                experience, we have become a go-to destination for customers
                seeking high-quality items across various categories. Our
                expertise, combined with our dedication to customer
                satisfaction, ensures that QuickMart remains a leader in
                e-commerce, providing exceptional products and services to
                shoppers worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                Our Mission and Vision
              </h3>
              <p className="mt-4 text-muted-foreground">
                Our mission at QuickMart is to offer a seamless and convenient
                shopping experience that empowers our customers to find and
                purchase the best products online. We aim to provide an
                extensive range of high-quality goods, backed by reliable
                customer service and fast delivery. With user-friendly
                technology and an easy-to-navigate platform, QuickMart is
                committed to helping customers save time and shop smarter,
                enhancing their overall experience.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our vision is to be the go-to destination for all online
                shopping needs, setting new standards in the e-commerce industry
                with innovative solutions. We aspire to create a global
                marketplace where customers can find top-tier products at
                competitive prices, enjoy smooth transactions, and experience
                world-class service. At QuickMart, we strive to lead the way in
                customer satisfaction, operational excellence, and environmental
                responsibility, building a sustainable future for both
                businesses and shoppers alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className=" py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-blue-700 text-center">{member.role}</p>
                <p className=" mt-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <div>
        <Contact />
      </div>

      {/* Our Store Location Information */}
      <section className="bg-background py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mt-7 md:mt-10">
            <h3 className="text-3xl font-medium text-center tracking-tight text-foreground">
              Visit Our Store
            </h3>
            <div className="mt-4 rounded-lg border shadow-sm">
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.5753808979825!2d91.83636487522948!3d22.331893141749624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad275100d9f757%3A0x744c25eb0b06166a!2zMiBSIEMgQ2h1cmNoIFJkLCDgpprgpp_gp43gpp_gppfgp43gprDgpr7gpq4!5e0!3m2!1sbn!2sbd!4v1720693220657!5m2!1sbn!2sbd"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  // allowFullScreen=""
                  aria-hidden="false"
                  // tabIndex="0"
                  title="QuickMart Store Location"
                />
              </div>
              <div className="p-4">
                <p className="font-medium text-foreground">QuickMart</p>
                <p className="mt-1 text-muted-foreground">
                  2 no R.C.Church road,Patherghata Chattogram, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
