import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown-logo.svg';
import { selectIsCartOpened } from '../../store/cart/cart.selectors';
import { signOutStart } from '../../store/user/user.actions';
import { selectCurrentUser } from '../../store/user/user.selectors';
import CartIcon from '../../components/cart-icon/CartIcon';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import { pages } from '../../utils/pages/pages';
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './navigation.styles';

const Navigation = memo(() => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpened);

  const handleSignOut = () => dispatch(signOutStart());

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/" className="logo-container">
          <CrownLogo />
        </LogoContainer>
        <NavLinks>

          {
						pages.map(({
							           isNavigation, path, title, className,
						           }) => isNavigation && (
							<NavLink
  key={path}
  to={path}
							>
  {title}
							</NavLink>
						))
					}

          {
						currentUser
						  ? <NavLink as="span" onClick={handleSignOut}> SIGN OUT</NavLink>
						  : <NavLink to="/auth">SIGN IN</NavLink>
					}

          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
      {' '}
      {/* Работает как children */}
    </>
  );
});

export default Navigation;
