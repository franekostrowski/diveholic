import { TitleRounded } from "@mui/icons-material";
import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import FlagRounded from "@mui/icons-material/FlagRounded";
import LineWeightRounded from "@mui/icons-material/LineWeightRounded";
import NumbersRounded from "@mui/icons-material/NumbersRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import SaveRounded from "@mui/icons-material/SaveRounded";
import ScaleRounded from "@mui/icons-material/ScaleRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TimelapseRounded from "@mui/icons-material/TimelapseRounded";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { User } from "@supabase/auth-helpers-nextjs";
import TextSeparator from "common/components/TextSeparator";
import type { Dive, DiveFlattened } from "common/types";
import getCountryCode from "common/utils/getCountryCode";
import getFlagEmoji from "common/utils/getFlagEmoji";
import { supabase } from "common/utils/supabaseClient";
import React, { useEffect, useState } from "react";

import Header from "./Header";
import diveInitialState from "./diveInitialState";

interface NewProps {
  user: User;
}

const New: React.FC<NewProps> = ({ user }) => {
  const [dive, setDive] = useState<DiveFlattened>(diveInitialState);

  useEffect(() => {
    const countryCode = getCountryCode(dive.locationCountryName);
    let flagEmoji = "";
    if (countryCode) flagEmoji = getFlagEmoji(countryCode);
    setDive((prevState: DiveFlattened) => ({
      ...prevState,
      locationCountryCode: countryCode,
      locationCountryFlagEmoji: flagEmoji,
    }));
  }, [dive.locationCountryName]);

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) => {
    setDive((prevState: DiveFlattened) => ({
      ...prevState,
      [prop]: e.target.value,
    }));
  };

  const handleDateTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(e.target.value);

    setDive((prevState: DiveFlattened) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDive: Dive = {
      date: dive.date,
      time: dive.time,
      location: {
        country: {
          name: dive.locationCountryName,
          code: dive.locationCountryCode,
          flagEmoji: dive.locationCountryFlagEmoji,
        },
        city: dive.locationCity,
        diveCenter: dive.locationDiveCenter,
      },
      length: dive.length,
      maxDepth: dive.maxDepth,
      weights: dive.weights,
      water: dive.water,
      temperature: {
        air: dive.temperatureAir,
        water: {
          average: dive.temperatureWaterAverage,
          minimum: dive.temperatureWaterMinimum,
        },
      },
      gear: {
        exposureProtection: {
          type: dive.gearExposureProtectionType,
          thickness: dive.gearExposureProtectionThickness,
        },
        tanks: {
          count: dive.gearTanksCount,
          type: dive.gearTanksType,
        },
      },
    };

    const { data, error } = await supabase
      .from("dives")
      .insert({ user_id: user.id, ...newDive });
    if (error) console.error(error);
  };

  return (
    <>
      <Header />

      <Box component="form" mt={4} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <TextField
              type="date"
              name="date"
              label="Date"
              startDecorator={<CalendarTodayRounded />}
              required
              onChange={(e) => handleDateTextFieldChange(e)}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="time"
              name="time"
              label="Time"
              startDecorator={<ScheduleRounded />}
              required
              onChange={(e) => handleTextFieldChange(e, "time")}
            />
          </Grid>
        </Grid>

        <Typography
          mt={6}
          mb={2}
          component="p"
          textColor="GrayText"
          fontWeight="md"
        >
          Location
        </Typography>
        <Grid spacing={2} container>
          <Grid xs={6}>
            <TextField
              type="text"
              name="locationCountry"
              label="Country"
              onChange={(e) => handleTextFieldChange(e, "locationCountryName")}
              startDecorator={
                dive.locationCountryFlagEmoji ? (
                  dive.locationCountryFlagEmoji
                ) : (
                  <PublicRounded />
                )
              }
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              name="locationCity"
              label="City"
              onChange={(e) => handleTextFieldChange(e, "locationCity")}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              type="text"
              name="locationDiveCenter"
              label="Dive center"
              startDecorator={<FlagRounded />}
              onChange={(e) => handleTextFieldChange(e, "locationDiveCenter")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={6}>
          <Grid xs={6}>
            <TextField
              type="text"
              name="diveType"
              label="Dive type"
              startDecorator={<TitleRounded />}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="number"
              name="length"
              label="Length"
              endDecorator="min"
              startDecorator={<TimelapseRounded />}
              onChange={(e) => handleTextFieldChange(e, "length")}
            />
          </Grid>{" "}
          <Grid xs={6}>
            <TextField
              type="number"
              name="maxDepth"
              label="Max depth"
              endDecorator="m"
              startDecorator={<DownloadRounded />}
              onChange={(e) => handleTextFieldChange(e, "maxDepth")}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="number"
              name="averageDepth"
              label="Average depth"
              endDecorator="m"
            />
          </Grid>
        </Grid>

        <Box mt={6}>
          <TextField
            type="text"
            name="water"
            label="Water"
            onChange={(e) => handleTextFieldChange(e, "water")}
          />
          <TextField
            type="number"
            name="weights"
            label="Weights"
            endDecorator="kg"
            startDecorator={<ScaleRounded />}
            onChange={(e) => handleTextFieldChange(e, "weights")}
            sx={{ mt: 2 }}
          />
          <RadioGroup
            defaultValue="perfect"
            name="radio-buttons-group"
            row
            sx={{ mt: 4 }}
          >
            <Radio value="perfect" label="Perfect" />
            <Radio value="tooLittle" label="Too little" />
            <Radio value="tooMuch" label="Too much" />
          </RadioGroup>
        </Box>

        <TextSeparator sx={{ mt: 8 }}>Gear</TextSeparator>
        <Typography
          mb={2}
          component="p"
          textColor="GrayText"
          fontWeight="md"
          mt={4}
        >
          Exposure protection
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={6}>
            <TextField
              type="text"
              name="exposureProtectionType"
              label="Type"
              onChange={(e) =>
                handleTextFieldChange(e, "gearExposureProtectionType")
              }
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              name="exposureProtectionThickness"
              label="Thickness"
              startDecorator={<LineWeightRounded />}
              onChange={(e) =>
                handleTextFieldChange(e, "gearExposureProtectionThickness")
              }
            />
          </Grid>
        </Grid>

        <Typography
          mb={2}
          mt={4}
          component="p"
          textColor="GrayText"
          fontWeight="md"
        >
          Tanks
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={6}>
            <TextField
              type="number"
              name="count"
              label="Count"
              startDecorator={<NumbersRounded />}
              onChange={(e) => handleTextFieldChange(e, "gearTanksCount")}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              name="tankType"
              label="Type"
              onChange={(e) => handleTextFieldChange(e, "gearTanksType")}
            />
          </Grid>
        </Grid>

        <TextSeparator sx={{ mt: 8 }}>Weather</TextSeparator>
        <Typography
          mb={2}
          mt={4}
          component="p"
          textColor="GrayText"
          fontWeight="md"
        >
          Temperature
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid xs={4}>
            <TextField
              type="number"
              name="temperatureAir"
              label="Air"
              fullWidth
              endDecorator="°C"
              onChange={(e) => handleTextFieldChange(e, "temperatureAir")}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              type="number"
              name="temperatureWaterAverage"
              label="Water avg."
              fullWidth
              endDecorator="°C"
              onChange={(e) =>
                handleTextFieldChange(e, "temperatureWaterAverage")
              }
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              type="number"
              name="temperatureWaterAverage"
              label="Water min."
              fullWidth
              endDecorator="°C"
              onChange={(e) =>
                handleTextFieldChange(e, "temperatureWaterMinimum")
              }
            />
          </Grid>
        </Grid>

        <TextField
          type="text"
          name="diveBuddy"
          label="Dive buddy"
          sx={{ mt: 6 }}
        />
        <TextField type="text" name="notes" label="Notes" sx={{ mt: 2 }} />

        <Button
          type="submit"
          color="success"
          size="lg"
          startIcon={<SaveRounded />}
          sx={{ mt: 6 }}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default New;
