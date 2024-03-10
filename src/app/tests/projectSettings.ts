import { check } from 'k6'
import http from 'k6/http'
import { ProjectSettings } from '../model/project-settings'

const endpoint = __ENV.K6_ENDPOINT

type Response<T> = {
  data: T
  statusCode: number
}

export const getProjectsSettings = (
  projectId: string
): Response<ProjectSettings> => {
  const path = `${endpoint}/project-settings/${projectId}`
  const params = {
    headers: {},
  }

  const res = http.get(path, params)
  const jsonRes = res.json() as { data: ProjectSettings }

  check(res, {
    'Get ProjectSettings By Id: is 200': (r) => r.status === 200,
    // 'Get ProjectSettings By Id: has correct id': (_) => jsonRes.data.id === user.id,
  })

  return {
    data: jsonRes.data,
    statusCode: res.status,
  }
}
