export interface FailureCategory {
  failure_category: string;
  ticket_count: number;
}

export interface TopFailuresResponse {
  customerId: number;
  customerName: string | null;
  data: FailureCategory[];
}

export interface Customer {
  id: number;
  name: string;
}

export type WidgetState = 'loading' | 'populated' | 'empty' | 'error';
