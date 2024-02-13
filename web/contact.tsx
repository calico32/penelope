import Layout from './layout'

export default function ContactPage() {
  return (
    <Layout title="Legal" class="items-center flex flex-col gap-8 min-w-[40ch] px-8 py-8">
      <a href="/" class="absolute top-9 left-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </a>
      <h1 class="font-bold text-3xl">Contact</h1>

      <span>Reach me at:</span>

      <span>devdoge1 &lang;at&rang; gmail &lang;dot&rang; com</span>
    </Layout>
  )
}
