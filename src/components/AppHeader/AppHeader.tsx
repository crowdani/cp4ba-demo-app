import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  
} from 'carbon-components-react';

import { Logout, Share, Save } from '@carbon/icons-react';


  const AppHeader = () => (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Carbon">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="IBM">
            Carbon
          </HeaderName>
          <HeaderNavigation aria-label="Carbon">
            <HeaderMenuItem href="/about">About</HeaderMenuItem>
            <HeaderMenuItem href="/Iocr">Iocr</HeaderMenuItem>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem href="/hello">About</HeaderMenuItem>

                <HeaderMenuItem href="/about">DoIt</HeaderMenuItem>
                <HeaderMenuItem href="/Iocr">Iocr</HeaderMenuItem>
              </HeaderSideNavItems>
             
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notifications">
              <Save />
            </HeaderGlobalAction>
        </HeaderGlobalBar>            
        </Header>
        
      )}
    />
  );
  
  export default AppHeader;