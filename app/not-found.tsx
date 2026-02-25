import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-background min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl dark:bg-primary/5" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              404
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg border border-border text-foreground font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
