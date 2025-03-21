interface Contribution {
    name: string;
}

interface ActualContribution extends Contribution {
    amount: number;
}

type Contributor = {
    name: string;
};

interface BaseExpense {
    payer: string;
    payee?: string;
}

interface PercentageExpense extends BaseExpense {
    percentage: number;
}

interface FixedExpense extends BaseExpense {
    amount: number;
}

type Expense = PercentageExpense | FixedExpense;

type ExpenseRecord = {
    contributions: string[];
    expenses: Expense[];
    payee: string;
};

type ExpenseConfiguration = {
    contributions: Contribution[];
    contributors: Contributor[];
    expenseRecord: ExpenseRecord[];
};

type ExpenseRecordSummary = {
    expenses: ItemizedExpenseRecord[];
    total: number;
};

type ItemizedExpenseRecord = {
    payee: string;
    amount: number;
    items: string[];
};

type ExpenseReport = Record<string, ExpenseRecordSummary>;
