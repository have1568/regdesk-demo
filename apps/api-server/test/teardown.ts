import { JestConfigWithTsJest } from "ts-jest";
import { execa } from "execa";

export default async function (globalConfig: JestConfigWithTsJest, projectConfig: JestConfigWithTsJest): Promise<void> {

    console.log('Jest Global Teardown: stopping MongoDB');

    await execa('docker', ['rm', '-f', 'jest_mongo_todo']);

}