"use client";

export default function SubscriptionPage() {
  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center">
      <div className="relative w-full bg-green-600 text-white text-center py-6 h-96">
        <h1 className="text-3xl font-bold">Our Plans</h1>
        <p className="text-lg mt-2">
          Choose the plan that best fits your needs
        </p>
      </div>

      <div className="absolute top-44 flex flex-wrap justify-center gap-6 mt-10 w-4/5">
        <div className="border-2 border-gray-300 bg-white shadow-lg w-80 flex flex-col items-center p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Basic</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">$99/month</p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p> Quality Streaming</p>
            <p> No Ads</p>
            <p> Email Support</p>
            <p> 1 Device</p>
          </div>
          <button className="mt-6 hover:bg-third border-2 border-red-200 text-black px-6 py-2 rounded-lg transition">
            Subscribe
          </button>
        </div>

        <div className="border-2 border-gray-300 bg-white shadow-lg w-80 flex flex-col items-center p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Standard</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">$199/month</p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p> HD Quality</p>
            <p> No Ads</p>
            <p> Priority Email Support</p>
            <p> 3 Devices</p>
          </div>
          <button className="mt-6 hover:bg-third border-2 border-red-200 text-black px-6 py-2 rounded-lg transition">
            Subscribe
          </button>
        </div>

        <div className="border-2 border-gray-300 bg-white shadow-lg w-80 flex flex-col items-center p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Premium</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">$299/month</p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p> 4K Ultra HD</p>
            <p> No Ads</p>
            <p> 24/7 Customer Support</p>
            <p> 5 Devices</p>
          </div>
          <button className="mt-6 hover:bg-third border-2 border-red-200 text-black px-6 py-2 rounded-lg transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
