import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import MuiTabs from "@mui/joy/Tabs";
import React, { useEffect, useState } from "react";

import type {
  ComponentUpdatingDiveProps,
  ComponentWithTextFieldsProps,
} from "../types";
import Basics from "./Basics";
import Details from "./Details";
import Location from "./Location";

const Tabs: React.FC<
  ComponentUpdatingDiveProps & ComponentWithTextFieldsProps
> = ({ dive, handleTextFieldChange, updateDiveProp }) => {
  return (
    <MuiTabs
      defaultValue={0}
      sx={{
        backgroundColor: "transparent",
        px: 0,
        mt: 4,
      }}
    >
      <TabList size="lg" sx={{ mb: 4 }}>
        <Tab>Location</Tab>
        <Tab>Basics</Tab>
        <Tab>Details</Tab>
      </TabList>

      <TabPanel value={0}>
        <Location dive={dive} handleTextFieldChange={handleTextFieldChange} />
      </TabPanel>

      <TabPanel value={1}>
        <Basics
          dive={dive}
          handleTextFieldChange={handleTextFieldChange}
          updateDiveProp={updateDiveProp}
        />
      </TabPanel>

      <TabPanel value={2}>
        <Details dive={dive} updateDiveProp={updateDiveProp} />
      </TabPanel>
    </MuiTabs>
  );
};

export default Tabs;
