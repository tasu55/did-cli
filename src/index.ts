#!/bin/env node

import { Command } from 'commander';

const program = new Command();

// ツールのバージョンと説明を設定
program
  .version('1.0.0')
  .description('My CLI Tool');

// コマンドの定義
program
  .command('greet <name>')
  .description('Greet the specified name')
  .action((name: string) => {
    console.log(`Hello, ${name}!`);
  });

// コマンドの解析
program.parse(process.argv);
