import React,{useState} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
  import { FaUserCog } from "react-icons/fa";
function Mynavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar id="nav" expand="md" >
        <div className="container">
        <NavbarBrand className="text-dark font-weight-bold">COZA Store</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar >
              <DropdownToggle nav caret className="text-dark">
                <FaUserCog className="mr-2 mb-1" style={{fontSize:"25px"}} /> Admin
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Messages
                </DropdownItem>
                <DropdownItem>
                  Complaints
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        </Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default Mynavbar;
