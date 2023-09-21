import Image from 'next/image';
import background from 'public/NFT-image.png';

function IAiLogo() {
  return <Image alt="9022 Logo" src={background} quality={100} />;
}

export default IAiLogo;
