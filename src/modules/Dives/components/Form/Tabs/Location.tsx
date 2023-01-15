import FlagRounded from "@mui/icons-material/FlagRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import Autocomplete, { createFilterOptions } from "@mui/joy/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import TextField from "@mui/joy/TextField";
import { debounce } from "debounce";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { FormFields } from "../types";
import listOfCountries from "../utils/listOfCountries";

const Location: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<FormFields>();
  const watchLocationCountryFlagEmoji = watch("location.country.flagEmoji");
  const filterOptions = createFilterOptions({ limit: 20 });

  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={6}>
          <FormControl error={!!errors.location?.country?.name}>
            <FormLabel>Country</FormLabel>
            <Controller
              name="location.country.name"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={Object.values(listOfCountries)}
                  onInputChange={debounce(
                    (_: React.BaseSyntheticEvent, data: string) =>
                      field.onChange(data),
                    500
                  )}
                  onChange={debounce(
                    (_: React.BaseSyntheticEvent, data: string) =>
                      field.onChange(data),
                    500
                  )}
                  placeholder="Croatia"
                  startDecorator={
                    watchLocationCountryFlagEmoji || <PublicRounded />
                  }
                  freeSolo
                  error={!!errors.location?.country?.name}
                  filterOptions={filterOptions}
                  isOptionEqualToValue={(option, value) => option === value}
                  disableClearable
                />
              )}
            />
            <FormHelperText>
              {errors.location?.country?.name?.message?.toString()}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={6}>
          <TextField
            {...register("location.city")}
            type="text"
            label="City"
            placeholder="Trogir"
            helperText={errors.location?.city?.message?.toString()}
            error={!!errors.location?.city}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            {...register("location.diveCenter")}
            type="text"
            label="Dive center"
            placeholder="Trogir dive center"
            startDecorator={<FlagRounded />}
            helperText={errors.location?.diveCenter?.message?.toString()}
            error={!!errors.location?.diveCenter}
          />
        </Grid>
      </Grid>

      <Link mt={4} startDecorator={<PlaceRounded />} color="info" disabled>
        Use previous dive location
      </Link>
    </>
  );
};

export default Location;
