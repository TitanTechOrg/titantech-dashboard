const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');

const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');

const tsParser = require('@typescript-eslint/parser');
const reactRefresh = require('eslint-plugin-react-refresh');
const tanstackQuery = require('@tanstack/eslint-plugin-query');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

module.exports = defineConfig([
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
        },

        extends: fixupConfigRules(
            compat.extends(
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react-hooks/recommended',
                'prettier',
                'plugin:@tanstack/eslint-plugin-query/recommended'
            )
        ),

        plugins: {
            'react-refresh': reactRefresh,
            '@tanstack/query': fixupPluginRules(tanstackQuery),
        },

        rules: {
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],
        },
    },
    globalIgnores(['**/dist', '**/.eslintrc.cjs']),
]);
