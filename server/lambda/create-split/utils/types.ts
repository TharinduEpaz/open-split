export interface ApiGatewayEvent {
  httpMethod: string;
  resource: string;
  pathParameters?: {
    [key: string]: string | undefined;
  };
  body?: string | null;
  [key: string]: any;
}

export interface ParsedBody {
  [key: string]: any;
}

// Request body types for create-split endpoint
export interface BankDetails {
  accName: string;
  accountNo: string;
  bank: string;
  branch: string;
}

export interface Person {
  id: string;
  firstName: string;
  email: string;
  bankDetails: BankDetails;
}

export interface TaskPerson {
  id: string;
  amount: number;
}

export interface Task {
  taskName: string;
  amount: number;
  people: TaskPerson[];
}

export interface CreateSplitRequest {
  splitName: string;
  people: Person[];
  tasks: Task[];
}

