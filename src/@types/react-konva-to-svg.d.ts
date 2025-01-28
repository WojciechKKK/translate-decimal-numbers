declare module "react-konva-to-svg" {
  import { Stage } from "react-konva";
  
  export function exportStageSVG(stage: Stage, blog: boolean, options: any): string;
}
