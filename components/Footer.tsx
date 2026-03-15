import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0f0f0f] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#a855f7] to-[#10b981] rounded flex items-center justify-center">
                <span className="text-white font-bold">W3</span>
              </div>
              <span className="font-bold">Web3 Jobs</span>
            </div>
            <p className="text-sm text-gray-400">
              Know exactly what you're applying for before you apply.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/roles" className="hover:text-[#a855f7] transition">
                  All Roles
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-[#a855f7] transition">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/bridge" className="hover:text-[#a855f7] transition">
                  Web2 → Web3
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#a855f7] transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/resources" className="hover:text-[#a855f7] transition">
                  Resources
                </Link>
              </li>
              <li>
                <a
                  href="https://ethereum.org/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition"
                >
                  Ethereum.org
                </a>
              </li>
              <li>
                <a
                  href="https://mirror.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition"
                >
                  Web3 Writing
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Web3 Jobs Education. Built with passion for the web3 community.</p>
        </div>
      </div>
    </footer>
  );
}
