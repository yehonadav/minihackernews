import {createEnvironment} from "@common/server";
import {createAll} from "./src/createAll";
import {STAGE} from "@common/contracts";

const stage:STAGE = 'dev';
process.env.STAGE = stage;
createEnvironment();
createAll();