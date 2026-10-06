import Image, { StaticImageData } from 'next/image';
interface AboutImageProps {
  image: StaticImageData;
  alt: string;
}

const AboutImage = ({ image, alt }: AboutImageProps) => {
  return (
    <div className='px-14 py-16 w-100 flex justify-center items-center grow'>
      <Image
        src={image}
        alt={alt}
        className='block h-full mx-auto my-0 rounded-full shadow-xl/30'
        width={350}
        height={350}
      />
    </div>
  );
};

export default AboutImage;
