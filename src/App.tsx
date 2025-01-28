import { useState, useCallback } from 'react'
import './App.css'
import React from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import { Button, Drawer, Stack, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import codeLegend from './assets/code-legend.png';
import CloseIcon from '@mui/icons-material/Close';
import { NUM_COORDINATES } from './config/generatorConfig';
import LineComponent from './components/LineComponent/LineComponent';
import {exportStageSVG} from "react-konva-to-svg"

function App() {
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [generated, setGenerated] = useState(false);
  const [visibileLegend, setVisibleLegend] = useState(false);

  const stageRef = React.useRef(null);
  
  function downloadURI(uri: string, name: string): void {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportToSvg = useCallback(async () => {
    if (!stageRef.current) {
      throw new Error('Invalid stage')
    };

    const svg = await exportStageSVG(stageRef.current, false, {
        onBefore: () => console.log("exporting"),
        onAfter: () => console.log("exported")
    });

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    downloadURI(URL.createObjectURL(blob), 'image.svg')
  }, [])

  
  function generateData(value: string): void {
    const coordinatesList: number[][] = [];

    value
      .split("")
      .forEach(code => coordinatesList.unshift(NUM_COORDINATES[Number(code)] || 0));

    setCoordinates(coordinatesList);
    setGenerated(true);
  }

  return (
    <React.Fragment>
      <SearchComponent 
        handleGenerateAction={generateData}
        isActiveSearch={!generated}
      />
      { generated && (
        <>
          <LineComponent stageRef={stageRef} coordinates={coordinates} />
          <Stack
            direction="row"
            spacing={2}
            sx={{mt: 4, justifyContent: "center", alignItems: "center"}}
          >
            <Tooltip title="Export to .svg">
              <Button variant="contained"  startIcon={<DownloadIcon />} onClick={exportToSvg}>SVG</Button>
            </Tooltip>
            <Tooltip title="Type new code">
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => setGenerated(false)}>Clear</Button>
            </Tooltip>
            <Tooltip title="Show documentation">
              <Button variant="outlined" startIcon={<LegendToggleIcon />} onClick={() => setVisibleLegend(true)}>Legend</Button>
            </Tooltip>
          </Stack>
          <Drawer anchor="right" open={visibileLegend} onClose={() => setVisibleLegend(false)}>
            <img width="auto" height="400" src={codeLegend} alt="Code Legend" />
            <Button sx={{m: 2}} variant="text" startIcon={<CloseIcon />} onClick={() => setVisibleLegend(false)}>Close</Button>
          </Drawer>
        </>
      )}
    </React.Fragment>
  )
}

export default App
