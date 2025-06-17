import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  altText: string;
  title: string;
  paragraph: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({icon, altText, title, paragraph}) => (
  <div>
    <figure className="h-32 mx-0 my-auto">
      <Image src={icon} alt={altText} className="block h-[100%] mx-auto my-0" width={120} height={120}/>
    </figure>
    <h4 className="text-center font-bold text-2xl mt-4 mb-0.5 sm:text-[1.25rem]">{title}</h4>
    <p className="text-center w-[200px]">{paragraph}</p>
  </div>
);

export default FeatureCard;