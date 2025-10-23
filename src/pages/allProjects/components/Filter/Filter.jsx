import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import filter from '../../../../assets/Filters.svg';

function MenuSection({ children, label }) {
  return (
    <MenuSectionRoot role="group">
      <MenuSectionLabel>{label}</MenuSectionLabel>
      <ul>{children}</ul>
    </MenuSectionRoot>
  );
}

MenuSection.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default function Filter() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    available: false,
    notavailable: false,
    twenty: false,
    forty: false,
    hundredper: false,
    low: false,
    average: false,
    high: false
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine, available, notavailable, twenty,
    forty,
    hundredper,
    low,
    average,
    high } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  const createHandleMenuClick = (menuItem) => {
    // return () => {
    //   console.log(`Clicked on ${menuItem}`);
    // };
  };

  return (
    <Box sx={{ height: "54px" }} >
      <Dropdown>
        <MenuButton><Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}><img src={filter} height="24px" />Filters </Box></MenuButton>

        <Menu slots={{ listbox: Listbox }}>
          <MenuSection label="Industry">
            <MenuItem onClick={createHandleMenuClick('Back')}></MenuItem>
            <MenuItem onClick={createHandleMenuClick('Forward')} disabled>

            </MenuItem>
            <MenuItem onClick={createHandleMenuClick('Refresh')}></MenuItem>
          </MenuSection>
          <MenuSection label="Risk factor">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={low} onChange={handleChange} name="low" />
                }
                label="Low"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={average} onChange={handleChange} name="average" />
                }
                label="Average"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={high} onChange={handleChange} name="high" />
                }
                label="High"
              />
            </FormGroup>

          </MenuSection>
          <MenuSection label="Documents">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={available} onChange={handleChange} name="available" />
                }
                label="Available"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={notavailable} onChange={handleChange} name="notavailable" />
                }
                label="Not Available"
              />
            </FormGroup>

          </MenuSection>
          <MenuSection label="Project readiness">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={twenty} onChange={handleChange} name="twenty" />
                }
                label="20% - 40%"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={forty} onChange={handleChange} name="forty" />
                }
                label="40% - 80%"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={hundredper} onChange={handleChange} name="hundredper" />
                }
                label="100%"
              />
            </FormGroup>

          </MenuSection>
          <Button variant="contained">Show results</Button>
        </Menu>

      </Dropdown>
    </Box>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const MenuSectionRoot = styled('li')`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;