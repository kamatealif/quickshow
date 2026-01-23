export default function StepMovie({ movie }: any) {
  return (
    <section className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
      <h1 className="text-2xl font-black">{movie.title}</h1>
      <p className="text-sm text-zinc-400">
        Select theater, seats, and payment
      </p>
    </section>
  );
}
