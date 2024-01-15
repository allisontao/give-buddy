import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./StepOne.css"
import { useGiveBuddyStore } from '../../store/store';

const StepOne = () => {
  const [transparency, updateTransparency, cause, updateCause, resultReporting, updateResultReporting] = useGiveBuddyStore(
    (state) => [state.transparency_score, state.updateTransparencyScore, state.cause_score, state.updateCauseScore, state.result_reporting_score, state.updateResultReportingScore]
  )

  // const [transparency, setTransparency] = React.useState('');
  // const [cause, setCause] = React.useState('');
  // const [resultReporting, setResultReporting] = React.useState('');

  const handleTransparencyChange = (event: SelectChangeEvent) => {
    updateTransparency(event.target.value as string);
  };

  const handleCauseChange = (event: SelectChangeEvent) => {
    updateCause(event.target.value as string);
  };

  const handleResultReportingChange = (event: SelectChangeEvent) => {
    updateResultReporting(event.target.value as string);
  };

  return (
    <>
      <div id="onboarding-step-one">
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="onboarding-step-one-select"
            value={transparency}
            onChange={handleTransparencyChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <div id="onboarding-step-one-description-container">
          <p id="onboarding-step-one-title">Financial Transparency</p>
          <p id="onboarding-step-one-description">How easily can we access its audited financial statements.</p>
        </div>
      </div>
        <div id="onboarding-step-one">
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="onboarding-step-one-select"
            value={cause}
            onChange={handleCauseChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <div id="onboarding-step-one-description-container">
          <p id="onboarding-step-one-title">Cents to the Cause</p>
          <p id="onboarding-step-one-description">How many cents goes towards the charity’s programs for each dollar donated</p>
        </div>
      </div>
        <div id="onboarding-step-one">
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="onboarding-step-one-select"
            value={resultReporting}
            onChange={handleResultReportingChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <div id="onboarding-step-one-description-container">
          <p id="onboarding-step-one-title">Results Reporting</p>
          <p id="onboarding-step-one-description">An evaluation of the charity’s reporting levels. Reports take in account the public reporting of the charity's activities, outputs, and outcomes.</p>
        </div>
      </div>
    </>
  )
}

export default StepOne