interface AboutCardProps {
  color: string;
  title: string;
  paragraph: string;
} 

const AboutCard = ({color, title, paragraph}: AboutCardProps) => {
  return (
    <div className={`${color} mx-5 px-14 py-16 rounded-3xl shadow-xl/30 my-10 w-[700px] grow`}>
      <h4 className="text-left text-5xl text-stone-50 mb-4">{title}</h4>
      <p className="text-left text-xl text-stone-50 tracking-[2px] leading-relaxed whitespace-pre-line">{paragraph}</p>
    </div>)
};

export default AboutCard;