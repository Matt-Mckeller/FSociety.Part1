import { gql } from "@apollo/client";

// Grab the input variables from the analytics context
// JWT is expected to be provided by intercepters
export const REGISTER_ANALYTICS_EVENT = gql`
  mutation registerAnalyticsEvent(
    $event: String
    $pageUrl: String
    $sessionId: String
    $eventTimestamp: String
    $params: String
    $metrics: MetricsAnalyticsContext
    $deviceContext: DeviceAnalyticsContext
  ) {
    registerAnalyticsEvent(
      input: {
        event: $event
        pageUrl: $pageUrl
        sessionId: $sessionId
        eventTimestamp: $eventTimestamp
        # todo, typing for event param options, not important at this moment
        # This is custom parameters specific to the individual event
        params: $params
        metrics: $metrics
        deviceContext: $deviceContext
      }
    ) {
      success
      id
    }
  }
`;
