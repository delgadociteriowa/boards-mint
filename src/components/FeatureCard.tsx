import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  altText: string;
  title: string;
  paragraph: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({icon, altText, title, paragraph}) => (
  <div className="flex flex-col items-center justify-center">
    <figure className="mx-0 my-auto bg-teal-700 rounded-full shadow-xl/20 w-[170px] h-[170px]">
      <Image src={icon} alt={altText} className="block h-[100%] mx-auto my-0" width={80} height={80}/>
    </figure>
    <h4 className="text-center font-bold text-2xl mt-4 mb-0.5 sm:text-[1.25rem]">{title}</h4>
    <p className="text-center w-[200px]">{paragraph}</p>
  </div>
);

export default FeatureCard;