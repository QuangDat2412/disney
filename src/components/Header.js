/* eslint-disable jsx-a11y/alt-text */
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './components.scss';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, provider } from '../firebase';
import {
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOutState,
} from '../features/user/userSlice';

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    };
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                history.push('/home');
            }
        });
    }, [history, setUser, userName]);

    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider)
                .then((result) => {
                    setUser(result.user);
                })
                .catch((error) => {
                    alert(error.message);
                });
        } else if (userName) {
            auth.signOut()
                .then(() => {
                    dispatch(setSignOutState());
                    history.push('/');
                })
                .catch((err) => alert(err.message));
        }
    };

    return (
        <StyledNavbar
            bg="dark"
            variant="dark"
            sticky="top"
            expand="sm"
            collapseOnSelect
        >
            <Logo>
                <a href="/">
                    <img
                        src="/images/logo.svg"
                        width="40px"
                        height="40px"
                    />
                </a>
            </Logo>

            {!userName ? (
                <Login onClick={handleAuth}>Login</Login>
            ) : (
                <>
                    <StyledNavbar.Toggle className="coloring" />
                    <StyledNavbar.Collapse>
                        <NavMenu>
                            <NavLink href="/home">
                                <img
                                    src="/images/home-icon.svg"
                                    alt="HOME"
                                />
                                <span>HOME</span>
                            </NavLink>
                            <NavLink href="#">
                                <img
                                    src="/images/search-icon.svg"
                                    alt="SEARCH"
                                />
                                <span>SEARCH</span>
                            </NavLink>
                            <NavLink href="#">
                                <img
                                    src="/images/watchlist-icon.svg"
                                    alt="WATCHLIST"
                                />
                                <span>WATCHLIST</span>
                            </NavLink>
                            <NavLink href="#">
                                <img
                                    src="/images/original-icon.svg"
                                    alt="ORIGINALS"
                                />
                                <span>ORIGINALS</span>
                            </NavLink>
                            <NavLink href="#">
                                <img
                                    src="/images/movie-icon.svg"
                                    alt="MOVIES"
                                />
                                <span>MOVIES</span>
                            </NavLink>
                            <NavLink href="#">
                                <img
                                    src="/images/series-icon.svg"
                                    alt="SERIES"
                                />
                                <span>SERIES</span>
                            </NavLink>
                        </NavMenu>
                        <NavMenu1>
                            <SignOut>
                                <NavDropdown
                                    title={
                                        <UserImg
                                            src={userPhoto}
                                            alt={userName}
                                        />
                                    }
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="#">
                                        {userName}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#">
                                        <span onClick={handleAuth}>
                                            Sign out
                                        </span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </SignOut>
                        </NavMenu1>
                    </StyledNavbar.Collapse>
                </>
            )}
        </StyledNavbar>
    );
};
const StyledNavbar = styled(Navbar)`
    @media (min-width: 576px) {
        height: 70px;
        padding: 0 36px;
        justify-content: space-between;
    }
    padding: 0 10px;
    background-color: #090b13 !important;
    position: fixed;
    width: 100%;
`;
const Logo = styled(StyledNavbar.Brand)`
    padding: 0;
    width: 80px;
    margin: 15px 0;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`;
const NavMenu = styled(Nav)`
    margin-right: auto;
    margin-left: 25px;
`;
const NavLink = styled(Nav.Link)`
    display: flex;
    align-items: center;
    padding: 25px 12px;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }

    span {
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;

        &:before {
            background-color: rgb(249, 249, 249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: '';
            height: 2px;
            left: 0px;
            opacity: 0;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
                0s;
            visibility: hidden;
            width: auto;
        }
    }

    &:hover {
        span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
        }
    }
`;
const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;
const NavMenu1 = styled(NavMenu)`
    @media (min-width: 576px) {
        margin: 0 0 0 auto;
    }
`;
const UserImg = styled.img`
    height: 100%;
`;

const SignOut = styled.div`
    position: relative;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    padding: 11px 0;
    justify-content: center;
    ${UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
`;
export default Header;
