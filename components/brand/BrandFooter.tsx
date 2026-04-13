import BrandStripe from './BrandStripe'

export default function BrandFooter() {
  return (
    <footer className="bg-white mt-auto">
      <BrandStripe />
      <div className="mx-auto max-w-5xl px-6 py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Lake Cement Ltd &mdash;{' '}
        <a
          href="mailto:projects@lakecement.co.tz"
          className="text-[var(--color-brand-blue)] hover:underline"
        >
          projects@lakecement.co.tz
        </a>
      </div>
    </footer>
  )
}
