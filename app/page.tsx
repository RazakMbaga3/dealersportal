import OrderForm from "@/components/OrderForm";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-brand-blue shadow-md">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logo.jpg"
              alt="Nyati Cement"
              width={56}
              height={56}
              className="rounded-xl shrink-0"
              priority
            />
            <div className="flex flex-col gap-1">
              <Image
                src="/assets/lake-cement-ltd-white.png"
                alt="Lake Cement Ltd"
                width={120}
                height={16}
                className="opacity-70"
              />
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-body">
                Hushika Haraka Hudumu Zaidi
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Brand accent stripe */}
      <div className="flex h-1.5">
        <div className="flex-5 bg-brand-blue" />
        <div className="flex-3 bg-brand-orange" />
        <div className="flex-2 bg-gray-300" />
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-blue">
            Project Cement Order Request
          </h2>
          <div className="mt-1.5 h-0.5 w-14 bg-brand-orange" />
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Please complete the form below to submit your cement purchase request. Our project
            coordinator will review your order and contact you within 1 business day to confirm
            availability and arrange delivery.
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <OrderForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-6">
        <div className="mx-auto max-w-3xl px-4 pb-5 sm:px-6">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Lake Cement Ltd &mdash; Nyati Cement &bull; For
            enquiries:{" "}
            <a
              href="mailto:projects@lakecement.co.tz"
              className="font-medium text-brand-blue hover:underline"
            >
              projects@lakecement.co.tz
            </a>
          </p>
        </div>
        {/* Brand accent stripe */}
        <div className="flex h-1">
          <div className="flex-5 bg-brand-blue" />
          <div className="flex-3 bg-brand-orange" />
          <div className="flex-2 bg-gray-300" />
        </div>
      </footer>
    </div>
  );
}
