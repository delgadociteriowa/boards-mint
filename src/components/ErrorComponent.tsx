interface ErrorComponentProps {
  error: string;
}

const ErrorComponent = ({error}: ErrorComponentProps) => (
  <main className="h-[800px]">
    <section className="py-16 px-10 text-stone-600">
      <h3 className="text-center text-4xl text-red-500 tracking-[2px] mt-10 mb-8">{error}</h3>
    </section>
  </main>
);

export default ErrorComponent;