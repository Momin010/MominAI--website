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
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
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
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
      },
      "devDependencies": {
        "@vitejs/plugin-react": "^4.3.1",
        "autoprefixer": "^10.4.19",
        "postcss": "^8.4.39",
        "tailwindcss": "^3.4.4",
        "vite": "^5.3.1"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.24.7.tgz",
      "integrity": "sha512-VuyA4zFLHY4pKiAbACb2q2o+52mJ/8ha04FkH7JgD0w2gV7vprHiNhe4u12wMx3e29v17JtPj502yI7+kSpDrA==",
      "dev": true,
      "dependencies": {
        "@babel/highlight": "^7.24.7",
        "picocolors": "^1.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.24.7.tgz",
      "integrity": "sha512-J3U9M2QdG3/qV4k3VT9q22oATw22g3p2iCVb+KxT6pLYtH0b4XbDtSo7vJ5++65eMLCXBw2b9x0myTDF3jH+PQ==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.24.7.tgz",
      "integrity": "sha512-sL20hV/3nL2yPvVmu3sjq38t02sQ2/E3vL4eC226d70hVIxZkGZz/o4/4cYH61j3yQvgmGNeQ2GqBv2qBtR47Q==",
      "dev": true,
      "dependencies": {
        "@babel/code-frame": "^7.24.7",
        "@babel/generator": "^7.24.7",
        "@babel/helper-compilation-targets": "^7.24.7",
        "@babel/helper-module-transforms": "^7.24.7",
        "@babel/helpers": "^7.24.7",
        "@babel/parser": "^7.24.7",
        "@babel/template": "^7.24.7",
        "@babel/traverse": "^7.24.7",
        "@babel/types": "^7.24.7",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.24.7.tgz",
      "integrity": "sha512-n20HZ62Ve5Y2lqTZ58QWVb6ZuWf4hA6aSYzUfBgh7w1rZ/8lndaspfNBZwtwGySnQi0s4Kkfl/i5a2aO5P0cMA==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.24.7",
        "@jridgewell/gen-mapping": "^0.3.5",
        "jsesc": "^2.5.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.24.7.tgz",
      "integrity": "sha512-yKVN32LG4go0IpkII/+l3oHw+ZCsiz0rA2/62LVeLo25YeyVhrb1+zYCLq4s4Acrr2S78kf7t2bvtBLgE+ZVcg==",
      "dev": true,
      "dependencies": {
        "@babel/compat-data": "^7.24.7",
        "@babel/helper-validator-option": "^7.24.7",
        "browserslist": "^4.23.0",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.24.7.tgz",
      "integrity": "sha512-zLALk9L+f2B+I34k8addIu5dJ2nwuGQPaD/XnWM1sQ8u3nCVo9c402179GLmDk+kY8VzaN2t2lVSsoM8+ms8DA==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.24.7.tgz",
      "integrity": "sha512-ZydxO0T7g2S1YhNFlrKq8zY0BnD1TNLwFgo8j5vBFaT2PcgT0eYJhm9fQDoh23qH+f4k2eK4wP/yTq81aWlpLw==",
      "dev": true,
      "dependencies": {
        "@babel/helper-environment-visitor": "^7.24.7",
        "@babel/helper-module-imports": "^7.24.7",
        "@babel/helper-simple-access": "^7.24.7",
        "@babel/helper-split-export-declaration": "^7.24.7",
        "@babel/helper-validator-identifier": "^7.24.7",
        "@babel/traverse": "^7.24.7",
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-simple-access": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.24.7.tgz",
      "integrity": "sha512-Ua5kCUfP2d0K3488VFf0zD0r7LhW22x443LgOtj8p3MY1A8qA3Iw3pLhwez2rzzBHB2w40F5lxn2fH2oVXBJ9Q==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-split-export-declaration": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-split-export-declaration/-/helper-split-export-declaration-7.24.7.tgz",
      "integrity": "sha512-V12NHDkdnw44YfQyXdr5c5d3t3Q5Y3C8KjYRDJv7WOmg/xCA64a6fg+W/2nSRLRPj9IBK/w/Amx3poh4+onpPQ==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.24.7.tgz",
      "integrity": "sha512-kADeOfm43IuPA2HYnR3w+Q+ng23n2nmC8hA+43yJ4Q7l+y2hmbC/2FL/w2Gq2X/cOpkV2Yc1z5r2EPRNNRkY3w==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.24.7.tgz",
      "integrity": "sha512-rSgG4hHutROjPOpikaKZMhLpSlY+fxAnb5t7qs6s8A3kmu3d7vA+wM0e+5jQRtKQlM9+Dtf+1QjwUaGgLfYz0A==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.24.7.tgz",
      "integrity": "sha512-n3bKk7oPMR2/h2x9W2sXgP3wtrcMghpFL+5D3QzIqZBaZEY02/DGGf9Xw7kHnLgBfn9M8b1uV12V2Q/wJvWeLg==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.24.7.tgz",
      "integrity": "sha512-hZgV0oY822SdyJQ5Pz3sTbzwh6d2039p/zEt8sDkCkVNLeQj5DI2Qk2fHCT8yTGrn7B3GfKkKYSRi1tBv0Q2nA==",
      "dev": true,
      "dependencies": {
        "@babel/template": "^7.24.7",
        "@babel/traverse": "^7.24.7",
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/highlight": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.24.7.tgz",
      "integrity": "sha512-N/4CgssBcmLOK8yGP2mL0a0uKhQ1gYnt3d50I3x0Cj/Y33zRf6n4R2YLo+XbQrd5Pj5KxszwpS8Zgqbhx5h3MA==",
      "dev": true,
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.24.7",
        "chalk": "^2.0.0",
        "js-tokens": "^4.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/highlight/node_modules/ansi-styles": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
      "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0PfL48QTG+LVGmx5/2kuzT7SoBht2iDSC5bFssMLiJ2YoO2usA==",
      "dev": true,
      "dependencies": {
        "color-convert": "^1.9.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@babel/highlight/node_modules/chalk": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
      "integrity": "sha512-Mti+f9LPJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralc5Far12hsLS2EgfnQrwDI5t6KXGuNj2EzPAPFNIKa4Q==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@babel/highlight/node_modules/color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQhgtag+Yg2bXPCONFIG_kmyUoXX2TVCb+w58ylX8LCpsxgНуNULLNULLsixmEeWPvuntOKXXrXxqAbDgg==",
      "dev": true,
      "dependencies": {
        "color-name": "1.1.3"
      }
    },
    "node_modules/@babel/highlight/node_modules/color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha512-72fSenhMw2ACoSW5vgu4qrvY3XpdVRSAXg+gWwvahplvglNr5iUAaDPmLsextBCZXw9acBLEmtpHCzjiXLPU9A==",
      "dev": true
    },
    "node_modules/@babel/highlight/node_modules/escape-string-regexp": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
      "integrity": "sha512-vbRorB5FUQWvla16U8R/qgaFIya2qGzwDrNmC4hDeUkIDVw446S4mqTRtq4I6mpdbssb1eAIoy3hfAe4k5Iqfg==",
      "dev": true,
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@babel/highlight/node_modules/has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha512-sKrqxLJEmdxxq CGABeeKPOD/vcN1FEJeJivxIOCsue3F1iCJq4KvjuaSuXaKGFgtFH3UeMmfioT+pT9msag1A9w==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@babel/highlight/node_modules/supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2SupzRabvcO9LPsFkbSSjNmf630b3LvMa0Nttamglp3Gc3Nuqx5gDFF2s9gA==",
      "dev": true,
      "dependencies": {
        "has-flag": "^3.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.24.7.tgz",
      "integrity": "sha512-jw3ZmMBGzG/rdu4H5g/9DMRaQ3Lo6AFEgF80lKFKptd5zciQPAAtgXQzWv8Wxe34Y/oT+Vk0c9WwR4FlcEu26Q==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.24.7"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.24.7.tgz",
      "integrity": "sha512-CgSrdY1o8y50rM28w2l/fADuOt3w3cCMUPP2kch2p2ikmF2mR+52554sL4bJ1z8wRCqi3k1Fw9fL11vqz6JS1A==",
      "dev": true,
      "dependencies": {
        "@babel/code-frame": "^7.24.7",
        "@babel/parser": "^7.24.7",
        "@babel/types": "^7.24.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.24.7.tgz",
      "integrity": "sha512-P3K0/BmgBCMaF/AXi17q2Dqj8rS5+SPdq/n9m4OFLmO45kRHS4cwLaj+UNzXpqj+5qfqIthk3Iu4hSgBf9+AzQ==",
      "dev": true,
      "dependencies": {
        "@babel/code-frame": "^7.24.7",
        "@babel/generator": "^7.24.7",
        "@babel/helper-environment-visitor": "^7.24.7",
        "@babel/helper-string-parser": "^7.24.7",
        "@babel/parser": "^7.24.7",
        "@babel/types": "^7.24.7",
        "debug": "^4.1.0",
        "globals": "^11.1.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse/node_modules/globals": {
      "version": "11.12.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
      "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6C/eLedAaUI1dJMN5z2H2eWpZkfIj1Pz4uAgRsZXssAy7HPWDUqayd5JnoEV2MbHw==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.24.7.tgz",
      "integrity": "sha512-i6p/7k3JNVo9mRTavYv0a32MGsmz2I5If44J8kHNW7y0gN4eQfJfkN7e10jGrh42d5y0g0wM3b/EwzJDQ/QZuQ==",
      "dev": true,
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.24.7",
        "to-fast-properties": "^2.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.5.tgz",
      "integrity": "sha512-MFpt92ztGS39sS2mg3aT2iAmHyca3izudfL2A/h2sE/zGjqmXspWZtQ7r7ntdYEKIzJI9Q0a2tL10K8bXq2WMw==",
      "dev": true,
      "dependencies": {
        "@jridgewell/set-array": "^1.2.1",
        "@jridgewell/sourcemap-codec": "^1.4.15",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-b2dG22nEwvyiF1h/NnwhsZd2aYjR0W/Lg9d5eEBlb/xT8/j+Tde4c/V+d9CjymT/KEs2AZmAe9o2mLo/+9KKOw==",
      "dev": true,
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/set-array": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.2.1.tgz",
      "integrity": "sha512-FqEE25YL2a33G5sD1n28Q4IpyN2k2I2/OJG5b2TgmGvNYeJ3d6LGNsO4jYkYWxecqI6a3sso1g0DRa/OQ5J2A==",
      "dev": true,
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
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.25",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz",
      "integrity": "sha512-vNk601k2r89b1e5xL/8a2i54QY3o29vBxeScNy6CRs2Tj7/Qp3t+8J2hFe5reP2n2cKqA/pZ2DqOoQY2k7Iaw==",
      "dev": true,
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.1",
        "@jridgewell/sourcemap-codec": "^1.4.15"
      }
    },
    "node_modules/@rollup/pluginutils": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/@rollup/pluginutils/-/pluginutils-5.1.0.tgz",
      "integrity": "sha512-VwCe5aVU/8PzS3j0yL/D1S2fL6a3yl4sS82xZ0FkY2SEl1A6a1+OQTR1rBfHPAw0a91PzxgpLSrNLYPMz5vNA==",
      "dev": true,
      "dependencies": {
        "estree-walker": "^2.0.2",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "rollup": "^2.0.0||^3.0.0||^4.0.0"
      },
      "peerDependenciesMeta": {
        "rollup": {
          "optional": true
        }
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.5.2.tgz",
      "integrity": "sha512-NcRtPEOsP3lk4T239c3usL33bC5I8G3bUotDJovmkdFnb2Qo33oLr1K/S3iKSUQgeK9vO2p2kYv23rvbf6Yn4Q==",
      "dev": true
    },
    "node_modules/@types/node": {
      "version": "20.14.8",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.14.8.tgz",
      "integrity": "sha512-TgmTMnF1Mv2U/0puAE0yv19y2bsO/9jbEj5b2S/OKya2Y52uvckk+Znw8l9/NQ2R0BhhTOjtd2GLHwV2TIxLQQ==",
      "dev": true,
      "dependencies": {
        "undici-types": "~5.26.4"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.3.1.tgz",
      "integrity": "sha512-dtc5KQ/4zU/dKKnX23gcrAvv+5+GhcU8kZO1F/d58Q/v/vJm7k2tJ2mPZf1xxFD5svC+D/zG5xR5Vf9KkL4rsw==",
      "dev": true,
      "dependencies": {
        "@babel/core": "^7.24.0",
        "@rollup/pluginutils": "^5.1.0",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0"
      }
    },
    "node_modules/@vitejs/plugin-react/node_modules/semver": {
      "version": "7.6.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.6.2.tgz",
      "integrity": "sha512-FNAIBJgII5cc+dG0Uu4vc42tHU2s3s/Iu2MLPiv2fVvK2j2/JN/T7a2rKyqFw92VnI4m4y+Q/e/i03w2i3O3sA==",
      "dev": true,
      "dependencies": {
        "lru-cache": "^6.0.0"
      },
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/acorn": {
      "version": "8.12.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.12.0.tgz",
      "integrity": "sha512-QFSEScQbQOF4eQe9IeqiDdF+f33iNqXfB87xZKHV3kR/72xlz1/9NAkrHl3dK34sC8/TkrN2y+rGFoQ7tGnXbA==",
      "dev": true,
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-walk": {
      "version": "8.3.2",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-8.3.2.tgz",
      "integrity": "sha512-83rQIZdwOSf9uUKoeE4k9ivdCq5qf/d6Vw3r2yQp3f/X/bL/K2QoVb4fP/eY8fflfgUj3s23B4uY41hJp3A/g==",
      "dev": true,
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-ZY9rGiylPxcPHauS51viG2NISfW9X6IWIiCLe6FddD7b/Evs529E493+y4KWsgK3hP/iMNNfW83o9n29MhXo5Q==",
      "dev": true
    },
    "node_modules/autoprefixer": {
      "version": "10.4.19",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.19.tgz",
      "integrity": "sha512-sUqg6z12m0rqX2+Gk5h4O4hpj2sBfLgT2MLW3f1JSa5/s/s/C23oZ/gBHyPZwtI0I9s7vjNcpEMq2K23o32WJg==",
      "dev": true,
      "dependencies": {
        "browserslist": "^4.23.0",
        "caniuse-lite": "^1.0.30001625",
        "lilconfig": "^2.1.0",
        "picocolors": "^1.0.0",
        "postcss": "^8.4.38",
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
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-CgZm2zm7sD2p4mvQSAM9IIQpjK+4b35s2l5i893/e51ltWc3GFEnp2yGf3s/3YhGqtevG81cRNu4i4T2L5yTkg==",
      "dev": true,
      "engines": {
        "node": ">=8"
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
      "version": "4.23.1",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.23.1.tgz",
      "integrity": "sha512-e5U8Fp6plTsuCatBDRr3WUgK+i5H8eW2N54+lA7j7iW3a/I+d8TC+0sgrv13n51cQqnwsb2a/j2gSC7A2yudIA==",
      "dev": true,
      "dependencies": {
        "caniuse-lite": "^1.0.30001630",
        "electron-to-chromium": "^1.4.845",
        "node-releases": "^2.0.14",
        "update-browserslist-db": "^1.1.0"
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
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7h2p/IGHqEddOoJ0IeInJWeJTPsV3yT5FxzsIG8o85malm4+Dvj88cm22D2Dws1+s5w2/2p3o+IeQwbk5le4eA==",
      "dev": true,
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "^3.0.2",
        "glob-parent": "^5.1.2",
        "is-binary-path": "^2.1.0",
        "is-glob": "^4.0.3",
        "normalize-path": "^3.0.0",
        "readdirp": "^3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://opencollective.com/chokidar"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiCVvonrdLzIFACp4ASnfIbpDADevVUZbEGNvrB9wetaL6SjUG/PYiDsYekzYJXKH4gPYMLpY9aovg==",
      "dev": true,
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-KvpKCaBf2PvgNzu413L2ylpyz9u043h+ehe9SfClv0xazD40/uXgVLk62f725qr9un9I2/JzUqb8kRhg2wLhBw==",
      "dev": true
    },
    "node_modules/debug": {
      "version": "4.3.5",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.5.tgz",
      "integrity": "sha512-DdmvHnfEwUIp2fAlRwaDa+Jqd00jP8MA1v6v4TqPQs42y3gKHMj4o52p6mPZ2oTMEk60sLhfjz2gT6sVClhxFw==",
      "dev": true,
      "dependencies": {
        "ms": "2.1.2"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-g+bJWMtA2dY0pCR52n7+a+aBvU0HHsVb5hVpl5awscyJ/3ksSlkO4/58SPm1jQjiEa2gMwF/1GgE2yl1JNK1Yw==",
      "dev": true
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-tgf8j40K23+3xvB2T+t3AFG37s/9ME6qg9Q6dC696/8H1E/b4wQo7dlO3Q3BAQ1S5LS2Y+9s/w2rA4h3wA==",
      "dev": true
    },
    "node_modules/electron-to-chromium": {
      "version": "1.4.866",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.866.tgz",
      "integrity": "sha512-3bKso1r1B9wJ9z4yT4whP85c0NeM1b05uQnXPj4/fGkgSg9tI53V5A352xI0QJd1YI1a8n1iCbKAP8S2j8YPg==",
      "dev": true
    },
    "node_modules/escalade": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.1.2.tgz",
      "integrity": "sha512-1brlG3o3ICr6NL8oJ3Iotnu9X9K3QYCF4bL73Ie+wiS00a6m72nIn2hJgRT2nOKJ2ePzMPMVTE92dOS8gmf0Hw==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-yG4nMyyh9D4L3wz+d4Gz3hI6l/vL24Xm2wZ1ZIaQ/A+d25Hg5lJ530M1jLwB1g3V12/fM1+rE9bS73cBQ==",
      "dev": true,
      "hasInstallScript": true,
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/estree-walker": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-2.0.2.tgz",
      "integrity": "sha512-WiIil9w1o12OFdt8d/gI303I2QRS/1OfiN628Lw2b2iST+bA02dYMDzkk5l5fnw2rFm1xKz2H4BOw+UvNnVeA==",
      "dev": true
    },
    "node_modules/fast-glob": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.2.tgz",
      "integrity": "sha512-oX2ruAFQwf/Orj8m737Y5adxYy0I7A8p7/xu3F43ThLgB5I7T3UrdS2gfkP4A8uxtmMuQ02pXVh02uLOM3v3pA==",
      "dev": true,
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.5",
        "glob-parent": "^6.0.2",
        "micromatch": "^4.0.5",
        "merge2": "^1.4.1"
      },
      "engines": {
        "node": ">=8"
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
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5rrqanwR3w4W6oo4DLC3A4iL4KFHDsoq3pTh721gG+G3/talPOH5v2PaVwIljK+aU6PzoSo9iPSzPI+b2d+gTw==",
      "dev": true,
      "hasInstallScript": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGDDADQcDlgNB/Nd+AZb5jMbVI+w+Al34Ag==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d/ll2NkeL1wAIQ9iDwz6iXAqA60f79xoEGLEMfbL/3ZXDqgDG7fzehcvND2Q==",
      "dev": true,
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
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
    "node_modules/is-core-module": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.13.1.tgz",
      "integrity": "sha512-hHrIjvZsftOsvKSn2TRYl63zvxajqaDdlf6av4BZEbABK+NMhIe8SH/385eM+Gf+o4kdg7U+0x1+OBpwc69r/g==",
      "dev": true,
      "dependencies": {
        "hasown": "^2.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
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
    "node_modules/is-inside-container": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-inside-container/-/is-inside-container-1.0.2.tgz",
      "integrity": "sha512-2M2vC0Q9+2z3gHw1PnpT22tQEfWSoNqA3+Bik1g22VAy2d0uI2Jhx2xTOIeM9L9i3/cIhohFiLMSF0Ax+2uYVA==",
      "dev": true,
      "engines": {
        "node": ">= 14"
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
    "node_modules/jsesc": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
      "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA996lqfLCgKjC/txvm2vIuCGE8do6CuNBl8ZEeLyL28ututecbpM29g==",
      "dev": true,
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eySUE5+i4k+V7sTTjMohI7NfQqr2keXtTSD2hS9xxDCXEbfJoeCoEa/5Z0tWpTfLx2eTmTs53RCM3u3A==",
      "dev": true,
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
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
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesomrJWBVRRaq3WoYQ3n540v5/Ci6n2+hQdQRzSP+3Fk3aSS9G223cs3f9akv95e9z9C2vRj25/u1Yw0w==",
      "dev": true
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
    "node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwne+Ek1fmbPe75obIlbCRI9HNL+rACb96vWyPd57AOFoFxt42Q==",
      "dev": true,
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-ESqa+sDkXvlMsoOkbA8StT14HCi/eH0Iu93T/3d5t7I3vSjCU9b8IAbfR09sBIrT5y29vLp3II9w03zD+GkOYg==",
      "dev": true,
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.5",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.5.tgz",
      "integrity": "sha512-D1OqY2P2qsTU/rHHVxlaiWfsnL20PQf27UjCg3OA7B39GkGy+2Z7G6bCSPSQ353zOhEeFzGvRRxkl3r3aTlsQA==",
      "dev": true,
      "dependencies": {
        "braces": "^3.0.2",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
      "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEAxCg==",
      "dev": true
    },
    "node_modules/nanoid": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.7.tgz",
      "integrity": "sha512-Nf3XSwtv75V80CrD2L399z4d638xO2i2Of5e4GH2ca/8z1162g3D+I2h3Nnsj42G4yQk1f2/oV3y/P6AmgLgA==",
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
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEêmdiEcArJBUS3N8MWCwcG/rRd/ICkElAbFaaWDeoYRtkUs9jL3GasDCeaz2ARf3jpRgITe1/gMeZA==",
      "dev": true
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
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-aMvjd6zuo2ztjYp8bBaqH+Gv2u3G6a7iZ2z3f2L/sgo63oDmM2b33lt2xlaES2TPAyGTTmvx1W8s1I/vjV2pGg==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
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
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.0.tgz",
      "integrity": "sha512-2dr4/f05fD5Rx3LSB0P2gI264vLoHU2b4L+1VAxIa23A2rDPsAb043k4xY8i/P3v2p596X2iVfTfQ143bWv94g==",
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
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4FFLKA+0IWUgror7P4KZBK0wcA==",
      "dev": true
    },
    "node_modules/quick-lru": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/quick-lru/-/quick-lru-5.1.1.tgz",
      "integrity": "sha512-1BURchSjflbIWURvxtuP3eOrCHUQEEn2cv/L3p91Qe/2wG4I9C+9kRnQ4Uv3wPqE7b2PAkf3s/AC4m4Cbd3w7w==",
      "dev": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEv7/dbROesI033OHwTO7nSA3ma24gwBolQ554X/0NBcss2Z0Hx63BVIwRY1OIT9R3ErJS5Y0g==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rD/pTCStvU/y7DDCi9zTUADJ2i34P2VLp1d/p3E2zpT3g32vYm5xJkL/534KCfN5HglGeyOEo2aLpQ==",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
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
    "node_modules/rollup": {
      "version": "4.18.0",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.18.0.tgz",
      "integrity": "sha512-0q4TmMfLGNbWbT7A36/vI28r8gb5f+o59+DK+1Y3Jat89pM/T2gC04ainu2JbSj3+yXpG2r9VvBmM44P4s1fJA==",
      "dev": true,
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
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
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-Ew3UjfbhdC6I0gZ+5s9wA0LX1GB7oG6yP/QBOcyU3tEpR/bKsvfWb/o4lT7D/u3t/yq2k/S39slU6gLpL4/bQA==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficRumY2M8wGPzAgvIxs8OaUeKAnG+AEcOTsOO0eA==",
      "dev": true,
      "bin": {
        "semver": "bin/semver.js"
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
    "node_modules/sucrase": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.0.tgz",
      "integrity": "sha512-VpHfD9dwxw2mABn7/9jq665eXCuylpIea2p82Qvj7zS2TjP27kT7z6FKmzgKjQHX/t+SyqfYfQsaN+wJb3wW3g==",
      "dev": true,
      "dependencies": {
        "lines-and-columns": "^1.2.4",
        "periscopic": "^2.0.3",
        "ts-interface-checker": "^0.1.13"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RnpPDheI9OBuc9w6Rjc3DfmE7e+lpNfuHpkpoeGoYOCdM9QyXSYKxKzLSASW5muGslQ==",
      "dev": true,
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.4.tgz",
      "integrity": "sha512-qKDDmeIooNnp4R2Lhi4weCi+6XUFUeEDTz5yymQEjWjw0k8/QLuA+TN3CljB+CQG3W1i5JtJvj8Fz6OOHu+4tg==",
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
    "node_modules/to-fast-properties": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
      "integrity": "sha512-adBtV1BCgUWzpuVP/iMMrl0ezfOKsIjUkkS2l2fV3gr+qZvraA8BANDOHFwY9OMG1TddxG12pc12K0pM6Zt/gQ==",
      "dev": true,
      "engines": {
        "node": ">=4"
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
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-OL7g2hHQQovJ5/aT4IuDdUJe+y00p4e4KOZHk4IuFagzS2sScUuF5P5zBC22eacI1NWg3zC2fN0w+kRj4q4jsQ==",
      "dev": true
    },
    "node_modules/undici-types": {
      "version": "5.26.5",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-5.26.5.tgz",
      "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==",
      "dev": true
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.0.tgz",
      "integrity": "sha512-xLMNK95sYx+4L13e3P2EIG1jrUGT4I4iZkU2O8KSYLAQga83/i+OFBTDR2aF3eXb1A4f14m2A3i4cGw0sTf5Zw==",
      "dev": true,
      "dependencies": {
        "escalade": "^3.1.2",
        "picocolors": "^1.0.1"
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
      "version": "5.3.1",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.3.1.tgz",
      "integrity": "sha512-yQRnGPLNGA/3V/P71ky245YPOkKrPaPgr/d5M3W3kI4aL41TMg0iYcT5y0XqgL0kRhc2YSk8pA4s928Hq+NYhQ==",
      "dev": true,
      "dependencies": {
        "esbuild": "^0.21.5",
        "lightningcss": "^1.25.1",
        "picocolors": "^1.0.1",
        "postcss": "^8.4.38",
        "resolve.exports": "^2.0.2",
        "rollup": "^4.18.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/yyx990803"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      },
      "peerDependencies": {
        "@types/node": ">=18",
        "less": "*",
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
    "node_modules/vite/node_modules/lightningcss": {
      "version": "1.25.1",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.25.1.tgz",
      "integrity": "sha512-m/8C/3sNDb8hKv2/L5t6bS0m85GCAJzV0g5Vn8kl22gDAs54npsqta1o6m51IPhY2b7iBRELr++9i/x7yWw3+A==",
      "dev": true,
      "hasInstallScript": true,
      "engines": {
        "node": ">= 12.0.0"
      },
      "optionalDependencies": {
        "lightningcss-darwin-arm64": "1.25.1",
        "lightningcss-darwin-x64": "1.25.1",
        "lightningcss-linux-arm-gnueabihf": "1.25.1",
        "lightningcss-linux-arm64-gnu": "1.25.1",
        "lightningcss-linux-arm64-musl": "1.25.1",
        "lightningcss-linux-x64-gnu": "1.25.1",
        "lightningcss-linux-x64-musl": "1.25.1",
        "lightningcss-win32-arm64-msvc": "1.25.1",
        "lightningcss-win32-ia32-msvc": "1.25.1",
        "lightningcss-win32-x64-msvc": "1.25.1"
      }
    },
    "node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PAVflMsreikc86LxbfdOcLccuXSo6r+A1cvKSw7ED8Wb4vURK3H3m95EkYCXi5o3aehG3+Sv4dsw==",
      "dev": true
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