import { describe, it, expect, vi, beforeEach } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerLogsTools } from '../../src/tools/logs';
import { DatadogClient } from '../../src/lib/datadog-client';

vi.mock('../../src/lib/datadog-client');

describe('registerLogsTools', () => {
  let server: McpServer;
  let mockClient: any;

  beforeEach(() => {
    server = new McpServer({ name: 'test', version: '1.0.0' });
    mockClient = {
      searchLogs: vi.fn(),
      listLogIndexes: vi.fn(),
    };
  });

  it('registers two tools on the server', () => {
    const spy = vi.spyOn(server, 'registerTool');
    registerLogsTools(server, mockClient as unknown as DatadogClient);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('search_logs', expect.any(Object), expect.any(Function));
    expect(spy).toHaveBeenCalledWith('list_log_indexes', expect.any(Object), expect.any(Function));
  });
});
