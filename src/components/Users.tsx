import { Avatar, Tab, Tabs, tabsClasses } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

function Users() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="col-span-full w-screen  border-t-zinc-300 border-t-2 dark:border-none dark:bg-zinc-900/40 ">
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
