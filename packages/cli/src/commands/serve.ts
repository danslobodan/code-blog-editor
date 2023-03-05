import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsnote-sg-org/local-api';

const isProduction = process.env.NODE_ENV === 'production';

interface LocalApiError {
    code: string;
}

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            const baseFileName = path.basename(filename);
            await serve(
                parseInt(options.port),
                baseFileName,
                dir,
                !isProduction
            );
            console.log(
                `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
            );
        } catch (error) {
            const isLocalApiError = (err: any): err is LocalApiError => {
                return typeof err.code === 'string';
            };

            if (isLocalApiError(error)) {
                if (error.code === 'EADDRINUSE') {
                    console.log(
                        `Port ${options.port} is in use. Try running on different port`
                    );
                }
            } else if (error instanceof Error) {
                console.error("Here's the problem: ", error.message);
            }
            process.exit(1);
        }
    });
