import {updateSSM, UpdateSSMProps} from "@yehonadav/yonadav-ssm-exporter"
import {envs} from "./secret";
import {Environment} from "@common/contracts";

const options:UpdateSSMProps<Environment> = {
    envs:[envs[1]],
    strategy: "appendOverride",
    exportToDirs: [
        `../db`,
        `../../services/offline`,
        `../../../common/server`,
        `../../services/ssm`,
        `../../services/ssm/tests`,
    ],
    sync: true,
};

updateSSM<Environment>(options).catch(console.error);