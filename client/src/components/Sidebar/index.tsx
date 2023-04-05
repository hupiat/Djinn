import { Treemap, Trend, Visible } from "@rsuite/icons";
import React from "react";
import { Nav, Sidenav } from "rsuite";
import "./styles.css";

export default function Sidebar() {
  return (
    <Sidenav id="sidenav">
      <Sidenav defaultOpenKeys={["3"]} appearance="inverse">
        <Sidenav.Body>
          <h2 id="sidenav__title">INTRANET</h2>
          <Nav>
            <Nav.Item eventKey="1" icon={<Treemap />}>
              Equipments
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Visible />}>
              Monitoring
            </Nav.Item>
            <Nav.Menu eventKey="3" title="Analytics" icon={<Trend />}>
              <Nav.Item eventKey="3-1">TODO</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidenav>
  );
}
