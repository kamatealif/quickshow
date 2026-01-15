import { Ticket, ShieldCheck, Sofa } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: Ticket,
    title: "Instant Booking",
    desc: "Book your tickets in seconds with real-time confirmation.",
  },
  {
    icon: Sofa,
    title: "Seat Selection",
    desc: "Choose your favorite seats before you pay.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Your payments are protected with industry-grade security.",
  },
]

export default function TrustSection() {
  return (
    <section className="py-20 bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-4 rounded-xl
                border border-white/10 bg-white/5 p-6
                hover:border-white/20 transition"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
