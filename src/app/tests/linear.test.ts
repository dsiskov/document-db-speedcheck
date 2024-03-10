import { SharedArray } from 'k6/data'
import execution from 'k6/execution'
import { Options } from 'k6/options'
import { getProjectsSettings } from './projectSettings'

const vuCount = Number(__ENV.K6_VU_COUNT)

const testingData = new SharedArray('projectIds', function () {
  return Array.from({ length: vuCount }).map((_, i) => ({
    project_id: (i + 1).toString(),
  }))
})

export const options: Options = {
  scenarios: {
    login: {
      executor: 'per-vu-iterations',
      vus: vuCount,
      iterations: 5,
      maxDuration: '5s',
    },
  },
}

export default function pm_tests() {
  // Get a random projectId from data that isn't currently being tested
  const projectId = testingData[execution.vu.idInTest - 1].project_id

  getProjectsSettings(projectId)
}
