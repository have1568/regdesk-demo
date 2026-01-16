import { JestConfigWithTsJest } from "ts-jest";
import { execa } from "execa";

export default async function (
    globalConfig: JestConfigWithTsJest,
    projectConfig: JestConfigWithTsJest
): Promise<void> {

    console.log('Jest Global Setup: starting MongoDB');

    try {
        await execa('docker', [
            'run',
            '--name', 'jest_mongo_todo',
            '-p', '27017:27017',
            '-e', 'MONGO_INITDB_ROOT_USERNAME=root',
            '-e', 'MONGO_INITDB_ROOT_PASSWORD=rootpass',
            '-e', 'MONGO_INITDB_DATABASE=tododb',
            '-d', 'docker.xuanyuan.me/library/mongo:6.0'
        ]);
    } catch (err: any) {
        if (!err.stderr?.includes('Conflict')) {
            throw err;
        }
        console.log('Mongo container already exists');
    }

    // 等待 MongoDB 完全启动
    await new Promise(res => setTimeout(res, 3000));

    process.env.JEST_MONGO_URI = 'mongodb://root:rootpass@localhost:27017/tododb?authSource=admin';

    console.log('Mongo ready at', process.env.JEST_MONGO_URI);
}
