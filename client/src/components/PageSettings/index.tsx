import React, { useState } from "react";
import Navbar from "../Navbar";
import { Card } from "@mui/material";
import InputLinkedinImport from "../forms/InputLinkedinImport";
import "./styles.css";
import { useRedirectToLogin } from "../../commons/hooks";
import { CVInformation, CVPartFields } from "../../commons/types";
import { useMiddlewareContext } from "../../commons/middleware/context";
import InputFormStandard from "../forms/InputFormStandard";
import {
  Person,
  LocationOn,
  Portrait,
  Work,
  School,
  Language,
  AccountTree,
  EmojiObjects,
  VolunteerActivism,
  Article,
  Link,
  VerifiedUser,
  People,
  Tag,
  AccountCircle,
  Public,
  Lightbulb,
} from "@mui/icons-material";
import { CVPartFieldToLabel } from "../../commons/tools";

const CVPartFieldsIcons = {
  first_name: <Person />,
  last_name: <Person />,
  location: <LocationOn />,
  profile_picture_url: <Portrait />,
  headline: <Lightbulb />,
  websites: <Link />,
  summary: <Article />,
  work_experience: <Work />,
  volunteering_experience: <VolunteerActivism />,
  skills: <EmojiObjects />,
  education: <School />,
  certifications: <VerifiedUser />,
  languages: <Language />,
  followers_count: <Public />,
  connections_count: <People />,
  projects: <AccountTree />,
  hashtags: <Tag />,
  background_profile_url: <AccountCircle />,
};

export default function PageSettings() {
  const { user, storeDataAccounts } = useMiddlewareContext();
  const [data, setData] = useState<CVInformation[]>(user?.informations || []);
  useRedirectToLogin();

  const handleImport = (informations: CVInformation[]) => {
    if (informations.length) {
      storeDataAccounts
        .update({
          ...user!,
          informations,
        })
        .then(console.log)
        .catch(console.error);
    }
  };

  return (
    <>
      <Navbar />
      <Card id="settings__container">
        <InputLinkedinImport
          onFetch={handleImport}
          containerClassName="settings__input"
          placeholder="Import your profile..."
          helperText="Enter your profile URL"
        />
        {CVPartFields.map((field) => (
          <InputFormStandard
            icon={CVPartFieldsIcons[field]}
            helperText={CVPartFieldToLabel(field)}
            containerClassName="settings__input"
            value={data.find((val) => val.field === field)?.value}
            onChange={(e) =>
              setData((vals) => {
                const val = vals.find((val) => val.field === field)!;
                val.value = e.target.value;
                return [...vals];
              })
            }
          />
        ))}
      </Card>
    </>
  );
}
