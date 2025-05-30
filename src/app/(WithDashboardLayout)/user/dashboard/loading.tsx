import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-full mx-auto min-h-screen flex items-center justify-center">
      <Image
        src="/loading.gif"
        width={100}
        height={100}
        alt="loading"
        className="mx-auto"
      />
    </div>
  );
};

export default LoadingPage;
