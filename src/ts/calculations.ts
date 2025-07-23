const isPercentageExpense = (expense: Expense): expense is PercentageExpense => {
    return (expense as PercentageExpense).percentage !== undefined;
};

const isFixedExpense = (expense: Expense): expense is FixedExpense => {
    return (expense as FixedExpense).amount !== undefined;
};

const calculatePercentageExpense = (expense: PercentageExpense, total: number): number => {
    return (expense.percentage * total) / 100;
};

const calculateFixedExpense = (expense: FixedExpense, remaining: number): number => {
    return Math.min(expense.amount, remaining);
};

const calculateExpense = (expense: Expense, total: number): number => {
    if (isPercentageExpense(expense)) {
        return calculatePercentageExpense(expense, total);
    } else if (isFixedExpense(expense)) {
        return calculateFixedExpense(expense, total);
    }

    return 0;
};

export const calculateExpenseReport = (
    liveContributions: Record<string, string>,
    configuration: ExpenseConfiguration,
): ExpenseReport => {
    const mappedContributions: ActualContribution[] = configuration.contributions
        .map((contribution) => {
            const indexedContributionAmount = liveContributions[contribution.name];
            const contributionAmount = indexedContributionAmount ? parseFloat(indexedContributionAmount) : 0;

            return {
                ...contribution,
                amount: contributionAmount,
            };
        })
        .filter((contribution) => contribution.amount > 0);

    const expenseReport: ExpenseReport = {};

    configuration.contributors.forEach((contributor) => {
        expenseReport[contributor.name] = {
            expenses: [],
            total: 0,
        };
    });

    configuration.expenseRecord.forEach((expenseRecord) => {
        const totalFromContributions = expenseRecord.contributions.reduce((total, contribution) => {
            const actualContribution = mappedContributions.find(
                (actualContributionElement) => actualContributionElement.name === contribution,
            );
            return total + (actualContribution?.amount || 0);
        }, 0);

        let remaining = totalFromContributions;

        const expenses = [...expenseRecord.expenses];
        expenses.sort((a) => ('amount' in a ? -1 : 1));

        expenses.forEach((expense) => {
            const expenseForContributor = calculateExpense(expense, remaining);

            const itemizedExpenseRecord: ItemizedExpenseRecord = {
                payee: expense.payee ?? expenseRecord.payee,
                amount: expenseForContributor,
                items: [...expenseRecord.contributions],
            };

            expenseReport[expense.payer].expenses.push(itemizedExpenseRecord);
            expenseReport[expense.payer].total += expenseForContributor;

            if ('amount' in expense) {
                remaining -= expenseForContributor;
            }

            remaining = Math.max(0, remaining);
        });
    });

    Object.entries(expenseReport).forEach(([__, expenseRecord]) => {
        const groupedExpenses: Record<string, ItemizedExpenseRecord> = {};

        expenseRecord.expenses.forEach((expense) => {
            if (groupedExpenses[expense.payee]) {
                groupedExpenses[expense.payee].amount += expense.amount;
                groupedExpenses[expense.payee].items.push(...expense.items);
            } else {
                groupedExpenses[expense.payee] = {
                    ...expense,
                };
            }
        });

        expenseRecord.expenses = Object.values(groupedExpenses);

        expenseRecord.expenses.forEach((expense) => {
            expense.amount = expense.amount;
        });
        expenseRecord.total = expenseRecord.total;
    });

    return expenseReport;
};
