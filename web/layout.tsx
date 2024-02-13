interface LayoutProps {
  title: string
  children: JSX.Element | JSX.Element[]
  head?: JSX.Element | JSX.Element[]
  class?: string
}

export default function Layout({ title, children, head, ...props }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="The GPT pentest tool" />
        <meta name="theme-color" content="#18181b" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/public/styles.css" />
        {head}
      </head>
      <body class="font-sans bg-zinc-950 text-white flex items-center justify-center min-h-screen">
        <main
          class={[
            'p-4 bg-zinc-900 rounded-lg container max-w-[70ch] border border-zinc-800 relative my-16 mx-8',
            props.class,
          ]}
        >
          {children}
        </main>

        {Bun.env.NODE_ENV === 'development' && <script src="/hot.js" />}
      </body>
    </html>
  )
}
