import { FC, MutableRefObject } from 'react';
import './LineComponent.scss';
import { Stage, Layer, Line } from 'react-konva';
import { DEFAULT_LINE, DEFAULT_LINE_COLOR, DEFAULT_LINE_WIDTH, DEFAULT_SVG_SIZE } from '../../config/generatorConfig';

interface LineComponentProps {
  stageRef: MutableRefObject<null>,
  coordinates: number[][]
 }

const LineComponent: FC<LineComponentProps> = ({stageRef, coordinates}) => {
  return (
    <Stage width={DEFAULT_SVG_SIZE} height={DEFAULT_SVG_SIZE} ref={stageRef}>
      <Layer>
        <Line
          points={DEFAULT_LINE}
          stroke={DEFAULT_LINE_COLOR}
          strokeWidth={DEFAULT_LINE_WIDTH}
        />
        <Line
          points={coordinates[0]}
          stroke={DEFAULT_LINE_COLOR}
          strokeWidth={DEFAULT_LINE_WIDTH}
        />
        <Line
          points={coordinates[1] || [0]}
          stroke={DEFAULT_LINE_COLOR}
          strokeWidth={DEFAULT_LINE_WIDTH}
          scaleX={-1}
          x={DEFAULT_SVG_SIZE}
          y={0}
        />
        <Line
          points={coordinates[2] || [0]}
          stroke={DEFAULT_LINE_COLOR}
          strokeWidth={DEFAULT_LINE_WIDTH}
          scaleY={-1}
          x={0}
          y={DEFAULT_SVG_SIZE}
        />
        <Line
          points={coordinates[3] || [0]}
          stroke={DEFAULT_LINE_COLOR}
          strokeWidth={DEFAULT_LINE_WIDTH}
          scaleX={-1}
          scaleY={-1}
          x={DEFAULT_SVG_SIZE}
          y={DEFAULT_SVG_SIZE}
        />
      </Layer>
    </Stage>
  )
}

export default LineComponent;
