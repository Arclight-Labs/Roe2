import { useLt } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import { AdItem } from "./AdSingle.o"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import CustomCarousel from "./CustomCarousel.o"

const AdPool = () => {
  useRoom()
  const { adPool } = useLt()

  return (
    <div>
      <Carousel
        stopOnHover={false}
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
        interval={10 * 500}
        showStatus={false}
        infiniteLoop
        autoPlay
        animationHandler="fade"
        key={adPool.ads.length}
      >
        {adPool.ads.map((ad) => (
          <CustomCarousel key={ad.id} adKey={ad.id}>
            <AdItem ad={ad} key={ad.id}></AdItem>
          </CustomCarousel>
        ))}
      </Carousel>
    </div>
  )
}

export default AdPool