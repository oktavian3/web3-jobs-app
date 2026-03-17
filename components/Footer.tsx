import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">W3</span>
              </div>
              <span className="font-semibold text-foreground">
                web3<span className="text-muted">jobs</span>
              </span>
            </div>
            <p className="text-sm text-muted">
              Know exactly what you're applying for before you apply.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/roles" className="hover:text-purple-600 transition">
                  All Roles
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-purple-600 transition">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/bridge" className="hover:text-purple-600 transition">
                  Web2 → Web3
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-purple-600 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Learn</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/resources" className="hover:text-purple-600 transition">
                  Resources
                </Link>
              </li>
              <li>
                <a
                  href="https://ethereum.org/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition"
                >
                  Ethereum.org
                </a>
              </li>
              <li>
                <a
                  href="https://mirror.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition"
                >
                  Web3 Writing
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Community</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted">
          <p>© 2026 Web3 Jobs Education. Built with passion for the web3 community.</p>
        </div>
      </div>
    </footer>
  );
}
