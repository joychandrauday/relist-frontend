import Navbar from "@/components/shared/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">{children}</main>
    </>
  );
};

export default CommonLayout;
