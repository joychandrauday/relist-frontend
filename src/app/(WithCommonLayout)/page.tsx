import Categories from "@/components/modules/Homepage/Categories";
import FeaturedProduct from "@/components/modules/Homepage/FeaturedProduct";
import Grid from "@/components/modules/Homepage/Grid";
import Hero from "@/components/modules/Homepage/Hero";
import ImageGrid from "@/components/modules/Homepage/ImageGrid";
import Newsletter from "@/components/modules/Homepage/NewsLetter";
import OurService from "@/components/modules/Homepage/ServiceModel";


const HomeBannerElements = () => {
  return (
    <>
      <Hero />
      <Grid />
      <Categories />
      <ImageGrid />
      <FeaturedProduct />
      <OurService />
      <Newsletter />
    </>
  );
};

export default HomeBannerElements;
