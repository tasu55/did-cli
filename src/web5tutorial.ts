import type { Web5 } from "@web5/api"
import { VerifiableCredential } from "@web5/credentials"

const web5tutorial = async (web5: Web5, did: string) => {
  console.log(did)
  const vc = await VerifiableCredential.create({
    type: 'Web5QuickstartCompletionCredential',
    issuer: did,
    subject: did,
    data: {
      name: 'Alice Smith',
      completionDate: new Date().toISOString(),
      expertiseLevel: 'Beginner'
    }
  })

  const signedVc = await vc.sign({ did: web5.agent.agentDid })
  const { record } = await web5.dwn.records.create({
    data: signedVc,
    message: {
      schema: 'Web5QuickstartCompletionCredential',
      dataFormat: 'application/vc+jwt',
      published: true
    }
  })
  const readSignedVc = await record?.data.text()
  if (readSignedVc === undefined) {
    process.exit(1)
  }
  const parsedVc = VerifiableCredential.parseJwt({ vcJwt: readSignedVc })
  console.log(parsedVc)
}

export default web5tutorial
