import Image, { StaticImageData } from 'next/image';

interface FeatureCardProps {
  icon: StaticImageData | string;
  altText: string;
  title: string;
  paragraph: string;
}

const FeatureCard = ({ icon, altText, title, paragraph }: FeatureCardProps) => (
  <div className='flex flex-col items-center justify-center'>
    <figure className='mx-0 my-auto bg-teal-700 rounded-full shadow-xl/20 w-42.5 h-42.5'>
      <Image
        src={icon}
        alt={altText}
        className='block h-full mx-auto my-0'
        width={80}
        height={80}
      />
    </figure>
    <h4 className='text-center font-bold text-2xl mt-4 mb-0.5 sm:text-[1.25rem]'>
      {title}
    </h4>
    <p className='text-center w-50'>{paragraph}</p>
  </div>
);

export default FeatureCard;
