# Datadog MCP Server

AWS Lambda에 배포하는 Datadog MCP 서버. Claude에서 Datadog Metrics와 Logs를 읽기 전용으로 조회할 수 있습니다.

## 사용 가능한 Tools

| Tool | 설명 |
|------|------|
| `query_metrics` | 메트릭 시계열 데이터 조회 |
| `list_metrics` | 메트릭 이름 검색 |
| `get_metric_metadata` | 메트릭 메타데이터 조회 |
| `search_logs` | 로그 검색 |
| `list_log_indexes` | 로그 인덱스 목록 |

## 배포 (관리자)

### 사전 요구사항

- Node.js 20+
- AWS CLI (설정 완료)
- AWS SAM CLI
- Datadog API Key + Application Key (Metrics Read + Logs Read 권한)

### 배포 순서

```bash
# 1. 의존성 설치
npm install

# 2. SAM 빌드 & 배포
sam build
sam deploy --guided
# Stack Name: datadog-mcp
# Region: 원하는 리전
# DatadogApiKey: <your-dd-api-key>
# DatadogAppKey: <your-dd-app-key>
```

### 배포 후 확인

```bash
# 엔드포인트 URL 확인
sam list stack-outputs --stack-name datadog-mcp

# API Key 값 확인
aws apigateway get-api-key --api-key <ApiKeyId from output> --include-value
```

## 팀원 설정 (Claude)

Claude Desktop 설정 파일 또는 Claude Code 프로젝트 설정에 추가:

```json
{
  "mcpServers": {
    "datadog": {
      "type": "url",
      "url": "https://<api-id>.execute-api.<region>.amazonaws.com/prod/mcp",
      "headers": {
        "x-api-key": "<shared-api-key>"
      }
    }
  }
}
```

관리자에게 URL과 API Key를 받아서 입력하세요.

## 사용 예시 (Claude에서)

- "최근 1시간 CPU 사용률 보여줘"
- "production 환경 ERROR 로그 검색해줘"
- "system.cpu 관련 메트릭 목록 알려줘"

## 개발

```bash
npm install
npm test           # 테스트 실행
npm run build      # TypeScript 빌드
```
