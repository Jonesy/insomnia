// @flow

import { getName, parseUrl } from '../common';

export function generateUpstreams(api: OpenApi3Spec, tags: Array<string>) {
  const servers = api.servers || [];

  if (servers.length === 0) {
    return [];
  }

  const upstream: DCUpstream = {
    name: getName(api),
    targets: [],
    tags,
  };

  for (const server of servers) {
    const target = parseUrl(server.url).host;

    if (target) {
      upstream.targets.push({
        target,
      });
    }
  }

  return [upstream];
}
