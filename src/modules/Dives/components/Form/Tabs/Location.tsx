import FlagRounded from "@mui/icons-material/FlagRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import Grid from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import TextField from "@mui/joy/TextField";
import React from "react";
import { useFormContext } from "react-hook-form";

const Location: React.FC = () => {
  const { register, watch } = useFormContext();
  const watchLocationCountryFlagEmoji = watch("locationCountryFlagEmoji");

  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={6}>
          <TextField
            {...register("locationCountryName")}
            type="text"
            placeholder="Croatia"
            label="Country"
            startDecorator={
              watchLocationCountryFlagEmoji ? (
                watchLocationCountryFlagEmoji
              ) : (
                <PublicRounded />
              )
            }
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            {...register("locationCity")}
            type="text"
            label="City"
            placeholder="Trogir"
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            {...register("locationDiveCenter")}
            type="text"
            label="Dive center"
            placeholder="Trogir dive center"
            startDecorator={<FlagRounded />}
          />
        </Grid>
      </Grid>
      <Link mt={4} startDecorator={<PlaceRounded />} color="info" disabled>
        Fill in with location from your latest dive
      </Link>
    </>
  );
};

export default Location;
