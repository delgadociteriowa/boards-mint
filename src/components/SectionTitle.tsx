type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <>
      <h3 className="
        w-full
        text-center
        md:w-auto
        md:text-left
        md:ml-8
        text-3xl
        md:tracking-[2px]
        tracking-[4px]
        mb-2
        text-stone-600
      ">{title}</h3>
      <div className="
        w-full
        max-w-[97%]
        h-px
        bg-stone-300
        mx-auto
      "></div>
    </>
  );
};

export default SectionTitle;