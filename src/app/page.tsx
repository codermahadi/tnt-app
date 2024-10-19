import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to TNT Chat Application
      </h1>
      {/* Description */}
      <p className="text-lg text-gray-700 mb-6">
        Explore real-time data with secure chat and file sharing.
      </p>
      {/* Get Started Button */}
      <Link href={'/login'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </Link>
    </div>
  );
}
