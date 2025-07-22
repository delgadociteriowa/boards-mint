import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy: React.FC = () => {
  return (
    <>
      <Header/>
        <main className="h-[750px]">
          <section className="mx-auto max-w-[1200px] flex flex-wrap mb-10 mt-4">
            <h3 className="text-left text-stone-600 text-4xl tracking-[2px] mt-10 mx-6">Privacy Policy</h3>
            <p className="text-left text-stone-600 leading-relaxed w-[100%] mt-10 mx-6">This site uses <a className="text-blue-600 hover:text-blue-500 font-bold" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a> to anonymously measure visits. No cookies are set, users are not identified or tracked.</p>
            <p className="text-left text-stone-600 leading-relaxed w-[100%] mt-4 mx-6"><a className="text-blue-600 hover:text-blue-500 font-bold" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a> is designed with a privacy-focused approach and aligns with leading data protection authority guidance. It does not collect personal identifiers that track or cross-check end users' data across different applications or websites. By default, it uses only aggregated data that cannot identify or re-identify end users. Additionally, <a className="text-blue-600 hover:text-blue-500 font-bold" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a> does not use cookies and identifies visitors through a hash created from the incoming request, which is valid for a single day and automatically reset. More information in <a className="text-blue-600 hover:text-blue-500 font-bold" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Web Analytics Privacy Policy</a>.</p>
            <p className="text-left text-stone-600 leading-relaxed w-[100%] mt-4 mx-6">Boards is a totally free virtual board game app and a passion project. It is not affiliated with or endorsed by any trademark.</p>
            <p className="text-center text-xl text-stone-600 tracking-[2px] leading-relaxed w-[100%] mt-10">Boards v1.0.0</p>
          </section>
        </main>
      <Footer/>
    </>
  );
}
export default Privacy;