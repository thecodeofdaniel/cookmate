export default function Navbar() {
  return (
    <nav className="bg-zinc-950 bg-opacity-70 p-4 backdrop-blur-sm">
      <div className="container flex justify-between">
        <h1>Guides/Tutorials</h1>
        <ul className="flex gap-8">
          <li>About</li>
          <li>Blog</li>
        </ul>
      </div>
    </nav>
  );
}
