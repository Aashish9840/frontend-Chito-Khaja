import Dashboard from "../components/Dashboard";
export const metadata = {
  metadataBase: new URL("https://foodDelivery.com/dashboard/"),
  title: "Dashboard - Food Deliery",
  keywords: ["food-delivery", "Instant Reach", "Online Food Support"],
  description:
    "Give your Brand a Pro Look With OX APP Suite in Nepal. Own a Professional Email of your Business Domain Today! From Affordable OX APP Suite Plans.",

  openGraph: {
    title: "Dashboard - Food Delivery",
    description:
      "Access Admin Dashboard to manage and handle the growing requirement of instant food delivery",
    images: "",

    url: "Admin",
  },
};
const page = () => {
  return <Dashboard />;
};

export default page;
