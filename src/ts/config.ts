const CONTRIBUTIONS = {
    RENT: 'Rent',
    LIGHT: 'Light',
    WATER: 'Water',
    CABLE: 'Cable',
    GARBAGE: 'Garbage',
    BANK_FEE: 'Bank Fee',
    AUTO_INSURANCE: 'Auto Insurance',
} as const;

const CONTRIBUTORS = {
    B: 'B',
    L: 'L',
    H: 'H',
    M: 'M',
    I: 'I',
} as const;

const ALL_CONTRIBUTIONS = Object.values(CONTRIBUTIONS).map((contribution) => ({ name: contribution }));
const ALL_CONTRIBUTORS = Object.values(CONTRIBUTORS).map((contributor) => ({ name: contributor }));

export const config: ExpenseConfiguration = {
    contributions: ALL_CONTRIBUTIONS,
    contributors: ALL_CONTRIBUTORS,
    expenseRecord: [
        {
            contributions: [CONTRIBUTIONS.RENT, CONTRIBUTIONS.BANK_FEE],
            payee: CONTRIBUTORS.L,
            expenses: [
                {
                    payer: CONTRIBUTORS.B,
                    percentage: 36,
                },
                {
                    payer: CONTRIBUTORS.L,
                    percentage: 20,
                },
                {
                    payer: CONTRIBUTORS.M,
                    percentage: 10,
                },
                {
                    payer: CONTRIBUTORS.H,
                    percentage: 2,
                },
                {
                    payer: CONTRIBUTORS.I,
                    percentage: 32,
                },
            ],
        },
        {
            contributions: [CONTRIBUTIONS.LIGHT, CONTRIBUTIONS.WATER, CONTRIBUTIONS.GARBAGE],
            payee: CONTRIBUTORS.L,
            expenses: [
                {
                    payer: CONTRIBUTORS.B,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.H,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.M,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.I,
                    percentage: 25,
                },
            ],
        },
        {
            contributions: [CONTRIBUTIONS.CABLE],
            payee: CONTRIBUTORS.H,
            expenses: [
                {
                    payer: CONTRIBUTORS.B,
                    amount: 15,
                },
                {
                    payer: CONTRIBUTORS.M,
                    amount: 20,
                },
                {
                    payer: CONTRIBUTORS.I,
                    amount: 15,
                },
                {
                    payer: CONTRIBUTORS.H,
                    percentage: 100,
                },
            ],
        },
        {
            contributions: [CONTRIBUTIONS.AUTO_INSURANCE],
            payee: CONTRIBUTORS.M,
            expenses: [
                {
                    payer: CONTRIBUTORS.B,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.H,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.M,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.I,
                    percentage: 25,
                },
            ],
        },
    ],
};
