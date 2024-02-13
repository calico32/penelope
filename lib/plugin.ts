import { stripIndent } from 'common-tags'
import { AIPlugin } from '../types/openai'
import { url } from './util'

const plugin: AIPlugin = {
  schema_version: 'v1',
  name_for_human: 'Penelope',
  name_for_model: 'penelope',
  description_for_human:
    'Penelope is a pentesting plugin that allows you to test your application for vulnerabilities.',
  description_for_model: stripIndent`
    Plugin for testing applications for vulnerabilities in a simulated environment.
    You can run arbitrary commands on a simulated attack server and see the results in real time, such as running a port scan or making an HTTP request.
    All machines accessible in the environment are in the 10.0.x.x address space.
    The attack server is running at 10.0.0.2.
    The environment is completely isolated from the internet.
    The plugin cannot access any resources outside of the environment.
    Use the plugin to run security tests on a given application.
  `,
  auth: { type: 'none' },
  api: {
    type: 'openapi',
    url: url('/openapi.yaml'),
  },
  logo_url: url('/logo.png'),
  legal_info_url: url('/legal'),
  contact_email: 'devdoge1@gmail.com',
}

export default plugin
