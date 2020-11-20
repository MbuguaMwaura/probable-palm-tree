import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink to="/app/dashboard/admin" className="icon-menu-item">
              <i className="iconsminds-shop-4 d-block" />{" "}
              <IntlMessages id="menu.dashboard" />
            </NavLink>

            <NavLink to="/app/orders/manage" className="icon-menu-item">
              <i className="simple-icon-basket-loaded d-block" />{" "}
              <IntlMessages id="menu.orders" />
            </NavLink>
            <NavLink to="/app/products/manage" className="icon-menu-item">
              <i className="iconsminds-box-close d-block" />{" "}
              <IntlMessages id="menu.products" />
            </NavLink>
            <NavLink to="/app/applications/chat" className="icon-menu-item">
              <i className="iconsminds-speach-bubble d-block" />{" "}
              <IntlMessages id="menu.chat" />
            </NavLink>
            <NavLink to="/app/regulations/trade-documents/list" className="icon-menu-item">
              <i className="simple-icon-lock-open d-block" />{" "}
              <IntlMessages id="menu.regulations" />
            </NavLink>
            <NavLink to="/app/value-added-services/manage" className="icon-menu-item">
              <i className="iconsminds-tag-3 d-block" />{" "}
              <IntlMessages id="menu.events" />
            </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
