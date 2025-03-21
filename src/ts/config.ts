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
    BRUCE: 'Bruce Berrios',
    LEANDRA: 'Leandra Berrios',
    HAZEL: 'Hazel Corrales',
    MANUEL: 'Manuel Berrios',
    ISAMARA: 'Isamara Berrios',
} as const;

const ALL_CONTRIBUTIONS = Object.values(CONTRIBUTIONS).map((contribution) => ({ name: contribution }));
const ALL_CONTRIBUTORS = Object.values(CONTRIBUTORS).map((contributor) => ({ name: contributor }));

export const config: ExpenseConfiguration = {
    contributions: ALL_CONTRIBUTIONS,
    contributors: ALL_CONTRIBUTORS,
    expenseRecord: [
        {
            contributions: [CONTRIBUTIONS.RENT, CONTRIBUTIONS.BANK_FEE],
            payee: CONTRIBUTORS.LEANDRA,
            expenses: [
                {
                    payer: CONTRIBUTORS.BRUCE,
                    percentage: 30.3,
                },
                {
                    payer: CONTRIBUTORS.LEANDRA,
                    percentage: 20,
                },
                {
                    payer: CONTRIBUTORS.MANUEL,
                    percentage: 23.4,
                },
                {
                    payer: CONTRIBUTORS.ISAMARA,
                    percentage: 26.3,
                },
            ],
        },
        {
            contributions: [CONTRIBUTIONS.LIGHT, CONTRIBUTIONS.WATER, CONTRIBUTIONS.GARBAGE],
            payee: CONTRIBUTORS.LEANDRA,
            expenses: [
                {
                    payer: CONTRIBUTORS.BRUCE,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.HAZEL,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.MANUEL,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.ISAMARA,
                    percentage: 25,
                },
            ],
        },
        {
            contributions: [CONTRIBUTIONS.CABLE],
            payee: CONTRIBUTORS.HAZEL,
            expenses: [
                {
                    payer: CONTRIBUTORS.BRUCE,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.HAZEL,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.MANUEL,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.ISAMARA,
                    percentage: 25,
                },
            ],
        },
        {
            contributions: [CONTRIBUTIONS.AUTO_INSURANCE],
            payee: CONTRIBUTORS.MANUEL,
            expenses: [
                {
                    payer: CONTRIBUTORS.BRUCE,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.HAZEL,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.MANUEL,
                    percentage: 25,
                },
                {
                    payer: CONTRIBUTORS.ISAMARA,
                    percentage: 25,
                },
            ],
        },
    ],
};
