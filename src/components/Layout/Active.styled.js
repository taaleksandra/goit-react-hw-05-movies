import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  &.active {
    border-bottom: solid 2px white;
  }
`;
