import Layout from './layout'

export default function HomePage() {
  return (
    <Layout title="Penelope" class="items-center flex flex-col gap-4 sm:px-8 md:px-16 w-max py-8">
      <h1 class="font-bold text-3xl">Penelope</h1>
      <h2 class="text-center">The GPT pentesting assistant research project.</h2>
      <div class="flex gap-6 items-center justify-center mt-2">
        <a href="/legal" class="ml-4 underline font-medium">
          Legal
        </a>
        <a href="/repo" class=" underline font-medium">
          Repository
        </a>
        <a href="/contact" class=" underline font-medium">
          Contact
        </a>
      </div>
    </Layout>
  )
}
