import Image from 'next/image';
import background from '../../../../../public/Banner.jpg';

function BGImage() {
  return <Image alt="Background Image" src={background} layout="fill" objectFit="cover" quality={50} />;
}

export default BGImage;
