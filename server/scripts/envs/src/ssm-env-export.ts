import {updateSSM, UpdateSSMProps} from "@yehonadav/yonadav-ssm-exporter"
import {envs} from "./secret";
import {Environment} from "@common/contracts";
import root from '../../../../package.json';
import fs from 'fs';

const options:UpdateSSMProps<Environment> = {
  envs,
  strategy: "appendOverride",
  exportToDirs: root.workspaces.packages.map(i=>{
    const path = '../../../../'+i;

    if (!path.endsWith('*'))
      return path;

    return fs.readdirSync(path.split('/*', 1)[0])
      .map(p=>path.replace('*', p));
  }).flat(),
  sync: true,
};

updateSSM<Environment>(options).catch(console.error);
