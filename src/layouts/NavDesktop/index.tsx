import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '../../components/Button';
import { HomeNav, SecondaryNav } from '../Navigation';


const classPrefix = 'nav-desktop__';

type NavButtonProps = {
  path: string;
  name: string;
  notifications?: number;
  home?: boolean;
  highlight?: boolean;
  onClick?: () => void;
  className?: string;
};

const NavButton: React.FC<NavButtonProps> = ({
  path,
  name,
  notifications,
  home,
  highlight,
  onClick,
  className = '',
}) => {
  return (
    <Link href={path}>
      <a className={className}>
        <Button
          width={highlight || home ? 140 : undefined}
          discrete={!highlight && !home}
          onClick={onClick}
          notifications={notifications}
          uppercase
        >
          {name}
        </Button>
      </a>
    </Link>
  );
};

const NavDesktop = () => {
  const router = useRouter();

  const [secondaryNav, setSecondaryNav] = React.useState(false);
  React.useEffect(() => setSecondaryNav(false), [router]);

  return (
    <ul className={`${classPrefix}basis`}>
      <li className="menu-element">
        <NavButton className="menu-element-link" path="/" name="Home" home />
        <Button
          className="menu-element-button"
          width={140}
          uppercase
        >
          Home
        </Button>
        <div className="menu-container">
          <div className="flyout">
            <HomeNav />
            <SecondaryNav />
          </div>
        </div>
      </li>
      <li>
        <NavButton path="/glossary" name="Glossary" />
      </li>
      <li>
        <NavButton
          path="/#contact"
          name="Contact us"
        />
      </li>
    </ul>
  );
}

export default NavDesktop;
