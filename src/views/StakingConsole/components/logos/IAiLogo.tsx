import Image from 'next/image';
import background from '../../../../public/NFT-image.png';

function IAiLogo() {
  return <Image alt="Background Image" src={background} quality={50} />;
}

export default IAiLogo;
