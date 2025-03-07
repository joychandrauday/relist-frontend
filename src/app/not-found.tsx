import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen mx-auto">
      <div className="">
        <Image
          src="/relisticon.png"
          width={100}
          height={100}
          alt="not found page"
          className="mx-auto"
        />
        <div className="py-2">
          <h1 className="text-gray-600 font-bold">
            X Page Not found or has been deleted!
          </h1>
          {/* add back to home link */}
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
