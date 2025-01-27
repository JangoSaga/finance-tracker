/* eslint-disable react/prop-types */
import { GiPayMoney, GiPiggyBank, GiWallet } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { HiCurrencyDollar, HiHome, HiUserCircle } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  &:hover {
    background-color: #4a5568;
    border-radius: 0.5rem;
    color: white;
    transition: all 0.2s ease-in-out;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #4a5568;
      border-radius: 0.5rem;
      color: white;
    `}
`;

function Navbar({ setIsMenuOpen, isMenuOpen }) {
  const location = useLocation();
  return (
    <nav
      className={`${
        isMenuOpen ? "block" : "hidden"
      } md:block flex-col gap-4 bg-gray-800 text-white p-4 md:m-2 md:rounded-lg md:w-[250px] min-w-[250px] max:max-w-[250px] h-[calc(100vh-theme(spacing.20))] sticky top-0`}
    >
      <div className="flex flex-col gap-2 ">
        <StyledLink
          to="/"
          isActive={location.pathname === "/"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiHome className="text-xl" />
          Home
        </StyledLink>
        <StyledLink
          to="/incomes"
          isActive={location.pathname === "/incomes"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <HiCurrencyDollar className="text-2xl" />
          Incomes
        </StyledLink>
        <StyledLink
          to="/expenses"
          isActive={location.pathname === "/expenses"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <GiPayMoney className="text-2xl" />
          Expenses
        </StyledLink>
        <StyledLink
          to="/categories"
          isActive={location.pathname === "/categories"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <GiWallet className="text-2xl" />
          Categories
        </StyledLink>
        <StyledLink
          to="/budgets"
          isActive={location.pathname === "/budgets"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <GrMoney className="text-2xl" />
          Budgets
        </StyledLink>
        <StyledLink
          to="/savings"
          isActive={location.pathname === "/savings"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <GiPiggyBank className="text-2xl" />
          Savings
        </StyledLink>
        <StyledLink
          to="/profile"
          isActive={location.pathname === "/profile"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <HiUserCircle className="text-2xl" />
          Profile
        </StyledLink>
      </div>
    </nav>
  );
}

export default Navbar;
