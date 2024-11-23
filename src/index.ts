#!/bin/env node

import { Command } from 'commander'
import { Web5 } from '@web5/api'
import web5tutorial from './web5tutorial.js'

const { web5, did } = await Web5.connect()

async function main() {
  const program = new Command()

  program
    .version('1.0.0')
    .description('My CLI Tool')

  program
    .command('create-signed-vc <file>')
    .description('create signed vc from <file> and save to <file>.jwt')
    .action((file: string) => {
      console.log(`specified file: ${file}!`)
    })
  program
    .command('store <jwtfile>')
    .description('store <jwtfile> to local dwn')
    .action(async (file: string) => {
      console.log(`specified file: ${file}!`)
      await web5tutorial(web5, did)
    })
  program
    .command('send <recordid> <todid>')
    .description('send dwn record to other remote dwn')
    .action((rid: string, todid: string) => {
      console.log(`specified rid:${rid}, did:${todid}!`)
    })
  program
    .command('list')
    .description('list dwn records')
    .action(() => {
      console.log("list")
      console.log('rid author creater')
    })
  program
    .command('read <rid>')
    .description('read dwn record from local/remote dwn')
    .action((rid: string) => {
      console.log(`specified record id: ${rid}!`)
    })

  await program.parseAsync(process.argv)
  process.exit(0)
}

try {
  await main()
} catch (e) {
  console.log(e)
  process.exit(-1)
}
