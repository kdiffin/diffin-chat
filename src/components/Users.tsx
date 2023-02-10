import { Avatar, Tab, Tabs, tabsClasses } from "@mui/material";
import React, { useState } from "react";

function Users() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className=" border-t-2 flex absolute bottom-0 opacity-0 phoneBug:relative phoneBug:opacity-100      border-zinc-700 bg-zinc-900/40 w-full">
      <Tabs
        variant="scrollable"
        scrollButtons
        value={value}
        onChange={handleChange}
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />{" "}
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
        <Tab
          sx={{
            paddingLeft: "2px",
            paddingRight: "2px",
            minWidth: "70px",
          }}
          label={<Avatar sx={{ width: 47, height: 47 }} />}
        />
      </Tabs>
    </div>
  );
}

export default Users;
