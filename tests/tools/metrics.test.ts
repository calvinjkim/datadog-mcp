import { describe, it, expect, vi, beforeEach } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerMetricsTools } from '../../src/tools/metrics';
import { DatadogClient } from '../../src/lib/datadog-client';

vi.mock('../../src/lib/datadog-client');

describe('registerMetricsTools', () => {
  let server: McpServer;
  let mockClient: any;

  beforeEach(() => {
    server = new McpServer({ name: 'test', version: '1.0.0' });
    mockClient = {
      queryMetrics: vi.fn(),
      listMetrics: vi.fn(),
      getMetricMetadata: vi.fn(),
    };
  });

  it('registers three tools on the server', () => {
    const spy = vi.spyOn(server, 'registerTool');
    registerMetricsTools(server, mockClient as unknown as DatadogClient);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith('query_metrics', expect.any(Object), expect.any(Function));
    expect(spy).toHaveBeenCalledWith('list_metrics', expect.any(Object), expect.any(Function));
    expect(spy).toHaveBeenCalledWith('get_metric_metadata', expect.any(Object), expect.any(Function));
  });
});
