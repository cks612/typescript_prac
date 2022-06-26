import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { List } from "../../types";

const CATEGORYLIST: List[] = [
  { id: 1, name: "최규성" },
  { id: 2, name: "최민석" },
  { id: 3, name: "이형준" },
  { id: 4, name: "이현석" },
  { id: 5, name: "머치스퀘어" },
  { id: 6, name: "유저 더하기" },
];

const Nav = () => {
  const navigate = useNavigate();

  const handleGoTo = (id: number) => {
    if (id === 6) {
      return (event: React.MouseEvent) => {
        navigate(`/addCustomer`);
      };
    } else {
      return (event: React.MouseEvent) => {
        navigate(`/customer/${id}`);
      };
    }
  };

  return (
    <>
      <NavWrapper>
        <NavHeader>
          <NavHeaderInfo>
            {CATEGORYLIST?.map((list) => {
              return (
                <NavHeaderInfoEach key={list.id} onClick={handleGoTo(list.id)}>
                  {list.name}
                </NavHeaderInfoEach>
              );
            })}
          </NavHeaderInfo>
        </NavHeader>
      </NavWrapper>
    </>
  );
};

export default Nav;

const NavWrapper = styled.div`
  width: 100vw;
  height: 100px;
  background-color: skyblue;
`;

const NavHeader = styled.div`
  display: flex;
  height: 100%;
  padding: 10px 10px;
  flex: 1;

  @media screen and (max-width: 535px) {
    display: none;
  }
`;

const NavHeaderInfo = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  width: 100%;
`;

const NavHeaderInfoEach = styled.li`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #107dc7;
  }

  &:nth-child(1) {
    padding-left: 20px;
  }
`;
