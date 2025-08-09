import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    const config = { plugins: [react(), basicSsl()], base: '/', resolve: { alias: { '@': path.resolve(__dirname, './src') } } };

    return config;
});
