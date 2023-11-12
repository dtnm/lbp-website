import { Link } from "react-router-dom";
import "../style/membership-sider.css";
import { Button, Drawer, Menu } from "antd";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import "../style/drawer-sider.css";

// This component will return a menu suitable for mobile phone display (Admin version)
const AdminDrawerSider = () => {
  const { t } = useTranslation();

  // Define the state of the menu
  const [open, setOpen] = useState(false);

  const [role, setRole] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Send a request to obtain role
        const response = await fetch("http://localhost:8000/api/users/get-role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        });
        const responseData = await response.json();

        if (response.status === 200) {
          // Fetch successful
          setRole(responseData["role"]);
          console.log("Fetch role successful");
          // console.log(responseData["role"]);
          // console.log(role);
        } else if (response.status===500) {
          console.log("Login token out of time")
          window.location.href = "/login";
          localStorage.setItem('outOftime', "true");
        } else {
          // Fetch failed
          console.log("Fetch role failed");
        }
      } catch (error) {
        console.error("Fetch role request error:", error);
      }
    };
    fetchProfile();
  }, [role]);

  // Change status to open
  const showDrawer = () => {
    setOpen(true);
  };

  // Change status to close
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Menu switch button */}
      <Button className="drawer-button" type="primary" block onClick={showDrawer}>
        Menu
      </Button>

      {/* All buttons in the menu */}
      <Drawer title="Menu" placement="left" closable={true} onClose={onClose} open={open}>
        <Menu>
          <Link to="/personal-info">
            <Button type="text" shape="round" size="large" block className="sider-button">
              {t('button_personal_info')}
            </Button>
          </Link>
          <Link to="/my-booking">
            <Button type="text" shape="round" size="large" block className="sider-button">
              {t('button_booking')}
            </Button>
          </Link>
          <Link to="/notifications">
            <Button type="text" shape="round" size="large" block className="sider-button">
              {t('button_notification')}
            </Button>
          </Link>
          {role === "admin" ? (
            <>
              <Link to="/admin-personal-info">
                <Button type="text" shape="round" size="large" block className="sider-button">
                  {t('button_view_personal_info')}
                </Button>
              </Link>
              <Link to="/admin-notification">
                <Button type="text" shape="round" size="large" block className="sider-button">
                  {t('button_edit_notification')}
                </Button>
              </Link>
              <Link to='/admin-timetable'>
                <Button type="text" shape="round" size="large" block className="sider-button">
                  {t('button_timetable')}
                </Button>
              </Link>
              <Link to="/Editor">
                <Button type="text" shape="round" size="large" block className="sider-button">
                  {t('button_admin')}
                </Button>
              </Link>
            </>
          ) : role === "tutor" ? (
            <>
              {/* <Link to=''> */}
              <Button type="text" shape="round" size="large" block className="sider-button">
                {t('button_tutor')}
              </Button>
              {/* </Link> */}
            </>
          ) : null}
        </Menu>
      </Drawer>
    </>
  );
};

export default AdminDrawerSider;
