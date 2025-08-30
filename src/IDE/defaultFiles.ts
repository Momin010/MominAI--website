
export const files = {
  'package.json': {
    file: {
      contents: `
{
  "name": "vite-react-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17"
  }
}`,
    },
  },
  'package-lock.json': {
    file: {
      contents: `
{
  "name": "vite-react-starter",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "vite-react-starter",
      "version": "0.0.0",
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      "devDependencies": {
        "@vitejs/plugin-react": "^4.0.3",
        "autoprefixer": "^10.4.17",
        "postcss": "^8.4.35",
        "tailwindcss": "^3.4.1",
        "vite": "^4.4.5"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.24.8",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.24.8.tgz",
      "integrity": "sha512-h4gXzEMFrnmB545PQTCl7ISQjVYr3mro7v9s7sV0pxPClbQBY50aKzchHh8S1s4TtzCkvt2n5JOKdOMT50s0qA==",
      "dev": true,
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.4.15",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.15.tgz",
      "integrity": "sha512-eF2rxCRulEKXHTssvEMu7thNRXM8FvAnTv0kCwbdTwSoaHFiKDyRdMAwONteb42wplUqs1FBvlP4H6HRsIMnkQ==",
      "dev": true
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.0.3.tgz",
      "integrity": "sha512-yTFWYs2SMf2t4i/jQMLSSPa8vYOWn3kU4oBhmbI6xIQQkL/p8y+CU3UeZBe3b8ePjFTk2p7t3/v86i3Vn13oRA==",
      "dev": true,
      "dependencies": {
        "@babel/parser": "^7.22.7"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^3.2.0 || ^4.0.0"
      }
    },
    "node_modules/autoprefixer": {
      "version": "10.4.17",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.17.tgz",
      "integrity": "sha512-V8Y14e/KSoaR5STvywVjlIo14xYIWm8NnN+a0SBCi8i8irLZZt1Sj3DJ/9T/k7h22y05g3i0G++h4QIOeHEgFQ==",
      "dev": true,
      "dependencies": {
        "browserslist": "^4.22.3",
        "caniuse-lite": "^1.0.30001582",
        "lilconfig": "^2.1.0",
        "picocolors": "^1.0.0",
        "postcss": "^8.4.33",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^12 || ^14 || >=16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/postcss/"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlN+wsCYoHRIqcTCKN/iOK201ACb84ottLz8pL1fA79D5enRI9gqXgoj59/wpkrt9Iu1Eg==",
      "dev": true,
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.23.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.23.0.tgz",
      "integrity": "sha512-urSr2pM3oPxB0fE6p2pY3xRUY8TdqQ4mes3xlm+8SAbicmjbJCpjdD7wWY5u0M3W1y04/eXvbmOSrPQk2E02mg==",
      "dev": true,
      "dependencies": {
        "caniuse-lite": "^1.0.30001588",
        "electron-to-chromium": "^1.4.743",
        "node-releases": "^2.0.14",
        "update-browserslist-db": "^1.0.13"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^12 || ^14 || >=16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/browserslist"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001633",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001633.tgz",
      "integrity": "sha512-K7L0D7H+0j2bIUkjE9l+pM+gIsUqujQnQGfK5e1iHW3cM7XzJucm5sWU+9fS41LxyO3HBDt3DqB95mGH4iYlVw==",
      "dev": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/browserslist"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-g+bJWMtA2dY0pCR52n7+a+aBvU0HHsVb5hVpl5awscyJ/3ksSlkO4/58SPm1jQjiEa2gMwF/1GgE2yl1JNK1Yw==",
      "dev": true
    },
    "node_modules/electron-to-chromium": {
      "version": "1.4.856",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.856.tgz",
      "integrity": "sha512-l0y2FvO45DmvXl2gR/PMA1fLgQHg2+Qp14s2L6CjMmc69iBCw0R3xKCAWDR/4o6p6b4/dK2U7gC9v1qXU4YhWw==",
      "dev": true
    },
    "node_modules/esbuild": {
      "version": "0.18.11",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.18.11.tgz",
      "integrity": "sha512-32T3uQ9a2ao3Tf3V2zRn0sUblvpu32QP3zNl325KxR0GUSE44vcP+eFmDkHnK8bCg32pA/e3s7g8g2G5R6p6iQ==",
      "dev": true,
      "hasInstallScript": true,
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/android-arm": "0.18.11",
        "@esbuild/android-arm64": "0.18.11",
        "@esbuild/android-x64": "0.18.11",
        "@esbuild/darwin-arm64": "0.18.11",
        "@esbuild/darwin-x64": "0.18.11",
        "@esbuild/freebsd-arm64": "0.18.11",
        "@esbuild/freebsd-x64": "0.18.11",
        "@esbuild/linux-arm": "0.18.11",
        "@esbuild/linux-arm64": "0.18.11",
        "@esbuild/linux-ia32": "0.18.11",
        "@esbuild/linux-loong64": "0.18.11",
        "@esbuild/linux-mips64el": "0.18.11",
        "@esbuild/linux-ppc64le": "0.18.11",
        "@esbuild/linux-riscv64": "0.18.11",
        "@esbuild/linux-s390x": "0.18.11",
        "@esbuild/linux-x64": "0.18.11",
        "@esbuild/netbsd-x64": "0.18.11",
        "@esbuild/openbsd-x64": "0.18.11",
        "@esbuild/sunos-x64": "0.18.11",
        "@esbuild/win32-arm64": "0.18.11",
        "@esbuild/win32-ia32": "0.18.11",
        "@esbuild/win32-x64": "0.18.11"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-Y7zkvjWeReMo0pYo8ld5hIiKJC+3mLL/Rp4+A4g2w/d4jR2Ie4wAbp3dYPAtoofRarE78kGML4kW93cm2kDbwg==",
      "dev": true,
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-Zz/PGc3C+HAlE3pNY9LuyAwB9io6g7A63vo1oR0iE/B435Q0Y1v_4XhhDSo4hR1bpxwQjM2xNXt4b4NQe4MIA==",
      "dev": true,
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEcvD7LiwKgRlPNm/GBCobJdnrhpfDs1UNb0pl3R8CBXtEVZOw==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayIuTMz7cu2tGTuLz7I4SYRznsyrydz6AdgCCFsM/r+/v1g7tH6tm4ACnEV7S7/I3soIFeAEbso4CFm90A==",
      "dev": true,
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+A2sevkGzDNec9aMS5OcpEVlREGdwANrNaQBJfNjVH2vQ==",
      "dev": true,
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
    },
    "node_modules/lilconfig": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz",
      "integrity": "sha512-utWOt/GHzuUxn5K7u7m3JmsEaar7FKv5T7L2sXSsNn82/oobKjCUhuI0E+I3aK/sd4oXvskPYRif6aNsKz2I9g==",
      "dev": true,
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.7.tgz",
      "integrity": "sha512-eSRppjcPIat8EXwGEJRYXBcdsmsnoLNy3XclDdsZ39cs2z529zfrPKpKi4PAunS3QJGSkif9s0p4x3KZgkdJoA==",
      "dev": true,
      "bin": {
        "nanoid": "bin/nanoid.js"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.14",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.14.tgz",
      "integrity": "sha512-yW7AbzK3V7QiZ1pL1c0+qD6E08Y22S7ulv2K814i2oPAQck8EMKzD5S2C61z9tSCP4Bsj4Q8QPSQh3cwhsYVaw==",
      "dev": true
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6ePaHxX63wazJFAz3gFFJmlCEI/IiXMCgqGbggdEVyS92MYcUr9uyzt6EzYmJPouGga+oiggkZ12d0VIOvew+w==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWesTMowkItms+00Te2L+r2/u4zXRfPKn2bB6N2b10rIvK/MV1Jg7El5b2p3Q==",
      "dev": true,
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/picocolors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.0.1.tgz",
      "integrity": "sha512-anQDJ0fV8NgoTcK54s17HwpvI0sFbfMcrH/uD0G3giu1K8aA/jWmm+9KiSA00jV3Q4vA/u8kjTGfkzhr2rHyAw==",
      "dev": true
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teI6E3YiNqbrk+3npG2f+PavrgbVgSA8SmrUrD2U6en6YKQyys28JHTzI6BP7sdGo3b1wEa5O/xdoIqVmEzQ==",
      "dev": true,
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.39",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.39.tgz",
      "integrity": "sha512-y2+B1grb5k56G8Tma7cT2Jz6Qn36w2/0+CH4WIZ6Nsx0Z3y9rW16uN2/c+BNx+g2fl8bI4F72x2BNK5uK665Fw==",
      "dev": true,
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.2.0"
      },
      "engines": {
        "node": "^12 || ^14 || >=16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/postcss/"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-ifbA5GHE45rqGNfiK8CEg+xdrEjP4z55e0K2sDIEp2T8p3Lpt1wGLAahkHjUf7UlJ/iV4E6iC5fL/6M1vQ4wYA==",
      "dev": true,
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz",
      "integrity": "sha512-dDLFh3gor3L3s6T+3gpHTNJNa2kg652253eQnLFYJikAV2klvA4F5p/sJpStO8A24NmM492+Y4Hn4T7u3g0+4w==",
      "dev": true,
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bsvmyDqsrg747dxoP8Kx80s2bC+r+f5Dy3c/zB9V/v43d2i4PUYwGWE4Ry7mli4Umm2T5d3nd/k63W4T5gVvLw==",
      "dev": true,
      "dependencies": {
        "lilconfig": "^2.1.0",
        "yaml": "^2.2.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.0.1.tgz",
      "integrity": "sha512-m3rvoG5s8v62Pz809N23Gfrqd2/i2/kI/b2T+IcV1PKS0pMu2A+XzthbrxMwdK2a9b3d2t/Pht3OFs1GNy+tNQ==",
      "dev": true,
      "dependencies": {
        "postcss-selector-parser": "^6.0.11"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.0.16",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.16.tgz",
      "integrity": "sha512-AhaClwp9e7AmT13Rfo3RffWJ3q/p3sPj6oX1kkuMC83CBgSs2HRf4Ttrr/hR8AC/nbg7P4xM2Dk8K8L7J+4b2A==",
      "dev": true,
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4SnPR7pTh0EQL6PNV18ZtIkcp2wDUXHyG3viVe9gwR5OBq502EX6XLS4HOKzW0hwpHDIZg==",
      "dev": true
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-aMvjd6zuo2ztjYp8bBaqH+Gv2u3G6a7iZ2z3f2L/sgo63oDmM2b33lt2xlaES2TPAyGTTmvx1W8s1I/vjV2pGg==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react": {
      "version": "18.2.0",
      "resolved": "https://registry.npmjs.org/react/-/react-18.2.0.tgz",
      "integrity": "sha512-/3IjMdbBGYgRMIDOOHLCVsU6BYwPOBOgmLkCM72jdzsSJnkAflMchruYUehMcmCVMBTuEQvLIIm5XJD9wM2w2A==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.2.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.2.0.tgz",
      "integrity": "sha512-6IMs9dvfsjpSMZhZuou/23CsBV9ajUDWGKAWYvsLegz1JClO3b8ahXY1p5IFQbddvveAwClklFikVtECJqHiNQ==",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.0"
      },
      "peerDependencies": {
        "react": "^18.2.0"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-L1E5gLyy6/UXD2sK222R9aBvB22K2V1nI3YDN3P3y/h/MFRs/mC/sKgsgCRoWdABAohb8hxUMT0X/iNmh2V4iQ==",
      "dev": true,
      "dependencies": {
        "pify": "^2.3.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8HkJq9VPd+aMqwWqDmsA9dpMqm88DosTNB7cuT+iEPEJaCD5WMbM1H6oB2Zpjw7eZdMREAwq+oG6wQ==",
      "dev": true,
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.8",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.8.tgz",
      "integrity": "sha512-oKWePCxqpd6KnDsQc3TnuM7N7gyU09iPjTVZ5i7iUDgALTsDPDpe8+na03aDPAm1wU3sHGoc58N1ctzbsAc6Ug==",
      "dev": true,
      "dependencies": {
        "is-core-module": "^2.13.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
      "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgV8WtxPaBC+8loA5B2mbtLd+G5sLk+3PK7T0jRPIwpeRg==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/rollup": {
      "version": "3.26.2",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-3.26.2.tgz",
      "integrity": "sha512-LYSIdL9+hMEOsTouVjBeH35E5Pq+Gxz/2Z8gMA/uY85rY4aC/tGkrEn8yAJQ/wKz/KRI8E3Ewdj/28SNJ4fa0g==",
      "dev": true,
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=14.18.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l49uFB9FBnZDdDLAnJ/RuDCiYjVnFkMu4wh4e25FGFm23s2d5gRjK00vP4vLzHe6/kUCRaM2BksJ0GR1xK/Xw==",
      "dev": true,
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.0.tgz",
      "integrity": "sha512-CtuThmgVNg7zIZEREBHghLp/8vcUFJeCqxBPoZLGX2VmUYVEBgQ5YVaXDFk63JGaJnq6/hrSsvsRUSOBDLO Tmw==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.0.tgz",
      "integrity": "sha512-itJW8lvSA0imC4d+fD39k55+2Mv3QYF6aD4vLFUCUv29G1zD3eXa/Y5Lp6zeJ0o20ZkUoP9L0o46I7Nb2x1wA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.1.tgz",
      "integrity": "sha512-d4pC2F5gD2ATb0h+yVgm5WhEAF3S1eQo2V/nsy0NN4C2k/pfnPq0E1Ie3V7s8aZH+B/wN5p7yY5naLAlrc6Vgw==",
      "dev": true,
      "dependencies": {
        "arg": "^5.0.2",
        "chokidar": "^3.5.3",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "is-inside-container": "^1.0.2",
        "lilconfig": "^2.1.0",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.0.0",
        "postcss": "^8.4.32",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.1",
        "postcss-nested": "^6.0.1",
        "postcss-selector-parser": "^6.0.13",
        "postcss-value-parser": "^4.2.0",
        "quick-lru": "^5.1.1",
        "resolve": "^1.22.8",
        "sucrase": "^3.34.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=16.14.0"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-652mALNT6hHMPLliM2Pohl2bC9afM92kJvifa4Yk9caSO6fLFGvYawIuS8hAnHQYvLMcBWPD620+GIJp9coVgA==",
      "dev": true,
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.0.13",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.0.13.tgz",
      "integrity": "sha512-xebPjlitIIB3i/iUEdN5P3g0Kx2oPfpx3w6h5A1I2T6FQRIRAErOMq4Fds7F1vB/cNu11qd0s2dJ+uHG3jGRbQ==",
      "dev": true,
      "dependencies": {
        "escalade": "^3.1.1",
        "picocolors": "^1.0.0"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/browserslist"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1zC9QDN5fA8rdJothAhX6oMn3gCrwmsAOKRHssgnttCqUiJpzyK-evCUAgEzBbs2+vw==",
      "dev": true
    },
    "node_modules/vite": {
      "version": "4.4.5",
      "resolved": "https://registry.npmjs.org/vite/-/vite-4.4.5.tgz",
      "integrity": "sha512-prCxLCfC+fOLm+3Q4wY1/yv6O1H92cHbJEDt1k0zIa/nQ2T22bT4S1y5pD0mDqLZC4QI93F2w29hrj2BGAzMA==",
      "dev": true,
      "dependencies": {
        "esbuild": "^0.18.11",
        "postcss": "^8.4.27",
        "resolve.exports": "^1.1.0",
        "rollup": "^3.26.2"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/yyx990803"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      },
      "peerDependencies": {
        "@types/node": ">=14",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/yaml": {
      "version": "2.4.5",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.4.5.tgz",
      "integrity": "sha512-a2J9VZgW9CR7f2/YsDdAnRfrT21/lSU3Ylr/iMXD4822fBskGv0C2HlDAp0/9bYj3/F3jY1/f/58d5wH5xVdDA==",
      "dev": true,
      "engines": {
        "node": ">= 14"
      }
    }
  }
}
`,
    },
  },
  'tailwind.config.js': {
    file: {
      contents: `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
    }
  },
  'postcss.config.js': {
    file: {
      contents: `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
    }
  },
  'vite.config.js': {
    file: {
      contents: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});`,
    },
  },
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebContainer App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    },
  },
  'src': {
    directory: {
        'main.jsx': {
            file: {
                contents: `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`
            }
        },
      'App.jsx': {
        file: {
          contents: `
import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-center bg-gray-900 text-white p-4">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Hello from WebContainer!
        </h1>
        <p className="text-gray-400">Your lightning-fast development environment is ready.</p>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Edit <code className="bg-gray-700 p-1 rounded font-mono">src/App.jsx</code> and save to see HMR in action.
          </p>
        </div>
      </div>
    </main>
  )
}

export default App
`,
        },
      },
      'index.css': {
        file: {
            contents: `
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
  width: 100%;
}

body {
  background-color: #111827; /* A nice dark gray */
  color: #f3f4f6; /* A light gray for text */
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`
        }
      }
    },
  },
};
