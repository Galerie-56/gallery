import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from '@remix-run/react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import type { NavItemStoryblok } from '~/types';
import { FaCaretDown } from 'react-icons/fa';
import { Collapsible } from '~/components/Collapse';

export const NavItem = ({ blok, mobile }: NavItemStoryblok) => {
  const { label, link, sub_menu, _uid, is_submenu } = blok;
  const hasSubmenu = sub_menu && sub_menu.length > 0;
  const menuRef = useRef<HTMLDivElement>(null);
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (!mobile && hasSubmenu && menuRef.current) {
      const checkAlignment = () => {
        const rect = menuRef.current?.getBoundingClientRect();
        if (rect) {
          const spaceOnRight = window.innerWidth - rect.right;
          const spaceOnLeft = rect.left;
          setAlignRight(spaceOnRight < spaceOnLeft);
        }
      };

      checkAlignment();
      window.addEventListener('resize', checkAlignment);
      return () => window.removeEventListener('resize', checkAlignment);
    }
  }, [mobile, hasSubmenu]);

  const SubMenu = ({ mobile }: { mobile: boolean }) => {
    if (mobile) {
      return (
        <Collapsible trigger={label} className="font-semibold text-primary">
          <div className="sub-menu min-w-[180px] text-lg ml-3 my-4 space-y-3 leading-tight mobile-sub-menu">
            {sub_menu.map((nestedBlok: NavItemStoryblok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </div>
        </Collapsible>
      );
    } else {
      return (
        <div
          className={`sub-menu absolute opacity-0 invisible group-hover:visible group-hover:block group-hover:opacity-100 bg-white mt-3 transition-all duration-500 -translate-y-[10px] group-hover:-translate-y-[0px] text-sm border border-gray-300 p-2 z-50 whitespace-nowrap ${
            alignRight ? 'right-0' : 'left-0'
          }`}
        >
          {sub_menu.map((nestedBlok: NavItemStoryblok) => (
            <div key={nestedBlok._uid} className="mb-2 text-sm leading-tight">
              <StoryblokComponent blok={nestedBlok} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div
      ref={menuRef}
      {...storyblokEditable(blok)}
      key={_uid}
      className={`menu-item ${hasSubmenu ? 'relative group' : ''} ${
        is_submenu !== true ? 'not-sub-menu' : 'is-sub-menu'
      } ${mobile ? 'mb-2' : ''}`}
    >
      {link.linktype === 'story' ? (
        <div
          {...storyblokEditable(blok)}
          key={_uid}
          className={`menu-item ${hasSubmenu ? 'relative group' : ''} ${
            is_submenu !== true ? 'not-sub-menu' : 'is-sub-menu'
          } ${mobile ? 'mb-2' : ''}`}
        >
          {hasSubmenu && mobile ? (
            <SubMenu mobile={mobile} />
          ) : (
            <NavLink
              prefetch="intent"
              to={link.cached_url}
              className={`inline-flex items-center hover:text-black ${
                hasSubmenu ? '' : ''
              }`}
            >
              {label}
              {hasSubmenu && <FaCaretDown className="ml-1" />}
            </NavLink>
          )}
          {hasSubmenu && !mobile && <SubMenu mobile={mobile} />}
        </div>
      ) : (
        <div className={`menu-item`} key={_uid} {...storyblokEditable(blok)}>
          <a
            href={link.url}
            target={link.target}
            className="inline-flex items-center hover:text-black"
          >
            {label}
          </a>
        </div>
      )}
    </div>
  );
};
