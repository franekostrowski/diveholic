import AddRounded from "@mui/icons-material/AddRounded";
import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import FlagRounded from "@mui/icons-material/FlagRounded";
import LineWeightRounded from "@mui/icons-material/LineWeightRounded";
import NumbersRounded from "@mui/icons-material/NumbersRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import ScaleRounded from "@mui/icons-material/ScaleRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TimelapseRounded from "@mui/icons-material/TimelapseRounded";
import { Button } from "@mui/joy";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Grid from "@mui/joy/Grid";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { User } from "@supabase/auth-helpers-nextjs";
import type { Dive } from "common/types";
import { supabase } from "common/utils/supabaseClient";
import { useRouter } from "next/router";
import React, { useState } from "react";

import diveInitialState from "./diveInitialState";

interface NewProps {
  user: User;
}

const New: React.FC<NewProps> = ({ user }) => {
  const router = useRouter();

  const [dive, setDive] = useState<Dive>(diveInitialState);

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) => {
    setDive((dive: Dive) => ({
      ...dive,
      [prop]: e.target.value,
    }));
  };

  const handleLocationTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) => {
    // Ignore stewpid error :)
    // @ts-ignore
    setDive((dive: Dive) => ({
      ...dive,
      location: {
        ...dive.location,
        [prop]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("dives")
      .insert({ user_id: user.id, ...dive });
    if (error) console.error(error);
    console.log(data);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          startDecorator={<AddRounded />}
          variant="soft"
          color="info"
          size="lg"
        >
          New dive
        </Chip>

        <Button
          color="danger"
          size="sm"
          variant="plain"
          onClick={() => router.push("/")}
          endIcon={<CloseRounded />}
        >
          Cancel
        </Button>
      </Box>

      <Box
        component="form"
        mt={4}
        sx={{ display: "flex", gap: 2, flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <Typography level="h4" component="p">
          Basic information
        </Typography>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField
            type="date"
            label="Date"
            fullWidth
            startDecorator={<CalendarTodayRounded />}
            required
            onChange={(e) => handleTextFieldChange(e, "date")}
          />
          <TextField
            type="time"
            label="Time"
            fullWidth
            startDecorator={<ScheduleRounded />}
            required
            onChange={(e) => handleTextFieldChange(e, "time")}
          />
        </Box>

        <Grid mt={2} spacing={2} container>
          <Grid xs={6}>
            <TextField
              type="text"
              label="Country"
              startDecorator={<PublicRounded />}
              onChange={(e) => handleLocationTextFieldChange(e, "country")}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              label="City"
              onChange={(e) => handleLocationTextFieldChange(e, "city")}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              type="text"
              label="Dive center"
              startDecorator={<FlagRounded />}
              onChange={(e) => handleLocationTextFieldChange(e, "diveCenter")}
            />
          </Grid>
        </Grid>

        <Box
          width="15%"
          bgcolor="neutral.400"
          height="2px"
          mx="auto"
          borderRadius="4px"
        />

        <Typography level="h4" component="p" mt={2}>
          Dive details
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={6}>
            <TextField
              type="number"
              label="Length"
              endDecorator="min"
              startDecorator={<TimelapseRounded />}
              onChange={(e) => handleTextFieldChange(e, "length")}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="number"
              label="Max depth"
              endDecorator="m"
              startDecorator={<DownloadRounded />}
              onChange={(e) => handleTextFieldChange(e, "maxDepth")}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="number"
              label="Weights"
              endDecorator="kg"
              startDecorator={<ScaleRounded />}
              onChange={(e) => handleTextFieldChange(e, "weights")}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              label="Water"
              onChange={(e) => handleTextFieldChange(e, "water")}
            />
          </Grid>
        </Grid>

        <Typography level="h5" component="p" mt={2}>
          Exposure protection
        </Typography>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={6}>
            <TextField type="text" label="Type" />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              label="Thickness"
              startDecorator={<LineWeightRounded />}
            />
          </Grid>
        </Grid>

        <Typography level="h5" component="p" mt={2}>
          Tanks
        </Typography>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={6}>
            <TextField
              type="number"
              label="Count"
              startDecorator={<NumbersRounded />}
            />
          </Grid>
          <Grid xs={6}>
            <TextField type="text" label="Type" />
          </Grid>
        </Grid>

        <Typography level="h5" component="p" mt={2}>
          Temperature
        </Typography>

        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={4}>
            <TextField type="number" label="Air" fullWidth endDecorator="°C" />
          </Grid>
          <Grid xs={4}>
            <TextField
              type="number"
              label="Water avg."
              fullWidth
              endDecorator="°C"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              type="number"
              label="Water min."
              fullWidth
              endDecorator="°C"
            />
          </Grid>
        </Grid>

        <TextField type="text" label="Notes" sx={{ mt: 2 }} />

        <Button
          type="submit"
          color="success"
          size="lg"
          startIcon={<DoneRounded />}
          sx={{ mt: 4 }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default New;