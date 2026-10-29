import { readFile, writeFile } from 'node:fs/promises';
const path='android/app/build.gradle';
let s=await readFile(path,'utf8');
const config=`
android {
    defaultConfig {
        versionCode Integer.parseInt(System.getenv('GITHUB_RUN_NUMBER') ?: '1') + 100
        versionName "1.0." + (System.getenv('GITHUB_RUN_NUMBER') ?: '1')
    }
    signingConfigs {
        release {
            storeFile file(System.getenv('ANDROID_KEYSTORE_PATH'))
            storePassword System.getenv('ANDROID_KEYSTORE_PASSWORD')
            keyAlias '8s2worldsoccer'
            keyPassword System.getenv('ANDROID_KEYSTORE_PASSWORD')
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
`;
s += config;
await writeFile(path,s);
console.log('Release signing and versionCode configured');
