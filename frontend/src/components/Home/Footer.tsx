export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-10 text-sm">
          <div>
            <h3 className="font-bold text-lg mb-4">OpenRouter Clone</h3>
            <p className="text-muted-foreground">© 2026 OpenRouter, Inc</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Chat</li>
              <li>Rankings</li>
              <li>Models</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>About</li>
              <li>Careers</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h4 className="font-semibold mb-4">Developer</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>SDK</li>
              <li>Status</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Discord</li>
              <li>GitHub</li>
              <li>LinkedIn</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
