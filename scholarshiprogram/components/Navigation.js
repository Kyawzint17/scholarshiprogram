// components/Navigation.js

import Link from 'next/link';

function Navigation({ session }) {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {session?.user?.roles?.includes('registrar') && (
          <li>
            <Link href="/protected">Registrar Dashboard</Link>
          </li>
        )}
        {/* Other navigation items */}
      </ul>
    </nav>
  );
}

export default Navigation;
