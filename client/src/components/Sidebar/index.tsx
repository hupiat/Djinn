import { Treemap, Trend, Visible } from "@rsuite/icons";
import { Nav, Sidenav } from "rsuite";
import "./styles.css";
import { PATH_ANALYTICS, PATH_EQUIPMENTS, PATH_MONITORING } from "./paths";
import { useSidebarContext } from "./context";
import { useCallback, useTransition } from "react";
import { useNavigate } from "react-router";
import { getCSSVar } from "../../commons/tools";

const ACTIVE_COLOR = getCSSVar("--purple-app");

export default function Sidebar() {
  const { currentSidebarPath, setCurrentSidebarPath } = useSidebarContext();
  const [, startTransition] = useTransition();
  const navigate = useNavigate();

  const fillActive = useCallback(
    (path: string) => (currentSidebarPath === path ? ACTIVE_COLOR : undefined),
    [currentSidebarPath]
  );

  const renderNavItem = useCallback(
    (path: string, title: string) => {
      const ICONS: { [path: string]: JSX.Element } = {
        [PATH_EQUIPMENTS]: <Treemap fill={fillActive(PATH_EQUIPMENTS)} />,
        [PATH_MONITORING]: <Visible fill={fillActive(PATH_MONITORING)} />,
        [PATH_ANALYTICS]: <Trend fill={fillActive(PATH_ANALYTICS)} />,
      };
      return (
        <Nav.Item
          icon={ICONS[path]}
          onClick={() => {
            startTransition(() => navigate(path));
            setCurrentSidebarPath(path);
          }}
        >
          <span
            style={{
              color: fillActive(path),
            }}
          >
            {title}
          </span>
        </Nav.Item>
      );
    },
    [fillActive, setCurrentSidebarPath, startTransition, navigate]
  );

  return (
    <Sidenav id="sidenav">
      <Sidenav defaultOpenKeys={[PATH_ANALYTICS]} appearance="inverse">
        <Sidenav.Body>
          <h2 id="sidenav__title">INTRANET</h2>
          <Nav>
            {renderNavItem(PATH_EQUIPMENTS, "Equipments")}
            {renderNavItem(PATH_MONITORING, "Monitoring")}
            <Nav.Menu
              eventKey={PATH_ANALYTICS}
              title="Analytics"
              icon={<Trend fill={fillActive(PATH_ANALYTICS)} />}
            >
              {renderNavItem(PATH_ANALYTICS, "TODO")}
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidenav>
  );
}
