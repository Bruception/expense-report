export const config: ExpenseConfiguration = {
    contributions: [
        {
            name: 'Rent',
        },
        {
            name: 'Light',
        },
        {
            name: 'Water',
        },
        {
            name: 'Cable',
        },
        {
            name: 'Garbage',
        },
        {
            name: 'Bank Fee',
        },
    ],
    contributors: [
        {
            name: 'Bruce Berrios',
        },
        {
            name: 'Leandra Berrios',
        },
        {
            name: 'Hazel Corrales',
        },
        {
            name: 'Manuel Berrios',
        },
        {
            name: 'Isamara Berrios',
        },
    ],
    expenseRecord: [
        {
            contributions: ['Rent', 'Bank Fee'],
            expenses: [
                {
                    payer: 'Bruce Berrios',
                    percentage: 30.3,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Leandra Berrios',
                    percentage: 20,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Hazel Corrales',
                    percentage: 11.7,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Manuel Berrios',
                    percentage: 11.7,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Isamara Berrios',
                    percentage: 26.3,
                    payee: 'Leandra Berrios',
                },
            ],
        },
        {
            contributions: ['Light', 'Water', 'Garbage'],
            expenses: [
                {
                    payer: 'Bruce Berrios',
                    percentage: 25,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Hazel Corrales',
                    percentage: 25,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Manuel Berrios',
                    percentage: 25,
                    payee: 'Leandra Berrios',
                },
                {
                    payer: 'Isamara Berrios',
                    percentage: 25,
                    payee: 'Leandra Berrios',
                },
            ],
        },
        {
            contributions: ['Cable'],
            expenses: [
                {
                    payer: 'Bruce Berrios',
                    percentage: 25,
                    payee: 'Hazel Corrales',
                },
                {
                    payer: 'Hazel Corrales',
                    percentage: 25,
                    payee: 'Hazel Corrales',
                },
                {
                    payer: 'Manuel Berrios',
                    percentage: 25,
                    payee: 'Hazel Corrales',
                },
                {
                    payer: 'Isamara Berrios',
                    percentage: 25,
                    payee: 'Hazel Corrales',
                },
            ],
        },
    ],
};
