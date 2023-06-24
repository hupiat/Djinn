import { Off, Treemap, Trend, Visible } from "@rsuite/icons";
import { Nav, Sidenav } from "rsuite";
import "./styles.css";
import {
  PATH_ANALYTICS,
  PATH_ASSETS,
  PATH_MONITORING,
  PATH_ROOT,
} from "./paths";
import { useSidebarContext } from "./context";
import { useCallback, useTransition } from "react";
import { useNavigate } from "react-router";
import { getCSSVar } from "../../commons/tools";
import { useMiddlewareContext } from "../../commons/middleware/context";

const ACTIVE_COLOR = getCSSVar("--purple-app");

export default function Sidebar() {
  const { currentSidebarPath, setCurrentSidebarPath } = useSidebarContext();
  const { setUser } = useMiddlewareContext();
  const [, startTransition] = useTransition();
  const navigate = useNavigate();

  const fillActive = useCallback(
    (path: string) => (currentSidebarPath === path ? ACTIVE_COLOR : undefined),
    [currentSidebarPath]
  );

  const renderNavItem = useCallback(
    (path: string, title: string) => {
      const ICONS: { [path: string]: JSX.Element } = {
        [PATH_ASSETS]: <Treemap fill={fillActive(PATH_ASSETS)} />,
        [PATH_MONITORING]: <Visible fill={fillActive(PATH_MONITORING)} />,
        [PATH_ANALYTICS]: <Trend fill={fillActive(PATH_ANALYTICS)} />,
        [PATH_ROOT]: <Off fill={fillActive(PATH_ROOT)} />,
      };
      const color = fillActive(path);
      return (
        <Nav.Item
          icon={ICONS[path]}
          active={!!color}
          onClick={() => {
            startTransition(() => {
              const navigation = () => {
                setCurrentSidebarPath(path);
                navigate(path);
              };
              if (path === PATH_ROOT) {
                setUser(null).then(navigation);
              } else {
                navigation();
              }
            });
          }}
        >
          <span
            style={{
              color,
            }}
          >
            {title}
          </span>
        </Nav.Item>
      );
    },
    [fillActive, setCurrentSidebarPath, startTransition, navigate, setUser]
  );

  return (
    <Sidenav id="sidenav">
      <Sidenav defaultOpenKeys={[PATH_ANALYTICS]} appearance="inverse">
        <Sidenav.Body>
          <h2 id="sidenav__title">INTRANET</h2>
          <Nav>
            {renderNavItem(PATH_ASSETS, "Assets")}
            {renderNavItem(PATH_MONITORING, "Monitoring")}
            <Nav.Menu
              eventKey={PATH_ANALYTICS}
              title="Analytics"
              icon={<Trend fill={fillActive(PATH_ANALYTICS)} />}
            >
              {renderNavItem(PATH_ANALYTICS, "TODO")}
            </Nav.Menu>
            {
              // TODO : à mettre en bas avec un loader qui tourne ou qui fait un timer + un toast pour annuler
              renderNavItem(PATH_ROOT, "Logout")
            }
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidenav>
  );
}
