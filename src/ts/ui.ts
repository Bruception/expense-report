import * as utils from './utils';
import { calculateExpenseReport } from './calculations';

export const generateExpenseReport = (liveExpenseReport: ExpenseReport) => {
    const reportContainer = document.getElementById('expense-report')!;
    reportContainer.innerHTML = '';

    const reportTotal = document.createElement('h3');
    reportTotal.id = 'report-total';
    reportTotal.textContent = `Total For This Month: $${Object.values(liveExpenseReport)
        .reduce((total, expenseRecord) => {
            return total + expenseRecord.total;
        }, 0)
        .toFixed(2)}`;

    reportContainer.appendChild(reportTotal);

    const breakdownTitle = document.createElement('h2');
    breakdownTitle.textContent = 'Breakdown';
    reportContainer.appendChild(breakdownTitle);

    const separator = document.createElement('hr');
    reportContainer.appendChild(separator);

    Object.entries(liveExpenseReport).forEach(([contributor, expenseRecord]) => {
        const contributorContainer = document.createElement('div');
        contributorContainer.className = 'contributor-container';

        const contributorTitle = document.createElement('h3');
        contributorTitle.textContent = contributor;
        contributorContainer.appendChild(contributorTitle);

        const nonZeroExpenses = expenseRecord.expenses.filter((expense) => expense.amount > 0);

        nonZeroExpenses.forEach((expense) => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';

            const payee = document.createElement('span');
            payee.innerHTML = `Pay To: <span class="highlight">${expense.payee}</span> `;
            expenseItem.appendChild(payee);

            const amount = document.createElement('div');
            amount.textContent = `Amount: $${expense.amount.toFixed(2)}`;
            expenseItem.appendChild(amount);

            const itemListLabel = document.createElement('span');
            itemListLabel.textContent = 'For: ';
            expenseItem.appendChild(itemListLabel);

            const itemList = document.createElement('ul');
            expense.items.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                itemList.appendChild(listItem);
            });
            expenseItem.appendChild(itemList);

            contributorContainer.appendChild(expenseItem);
        });

        const total = document.createElement('div');
        total.className = 'total';
        total.textContent = `Total: $${expenseRecord.total.toFixed(2)}`;

        contributorContainer.appendChild(total);
        contributorContainer.appendChild(document.createElement('hr'));

        reportContainer.appendChild(contributorContainer);
    });
};

const loadFormFromURL = (config: ExpenseConfiguration) => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedContributionAmounts = urlParams.get('contributions');
    if (!encodedContributionAmounts) {
        return;
    }

    const decodedContributionAmounts = JSON.parse(utils.base64URLDecode(encodedContributionAmounts));
    const form = document.getElementById('contribution-form');

    if (!form) {
        return;
    }

    const formData = new FormData(form as HTMLFormElement);
    const liveContributionAmounts = Object.fromEntries(formData.entries()) as Record<string, string>;
    const updatedContributionAmounts = {
        ...liveContributionAmounts,
        ...decodedContributionAmounts,
    };

    Object.entries(updatedContributionAmounts).forEach(([name, value]) => {
        const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement | undefined;
        if (input) {
            input.value = value as string;
        }
    });

    const liveExpenseReport = calculateExpenseReport(updatedContributionAmounts, config);
    generateExpenseReport(liveExpenseReport);
};

export const generateUI = (config: ExpenseConfiguration) => {
    const container = document.getElementById('root');
    if (!container) {
        return;
    }

    const { contributions } = config;

    const form = document.createElement('form');
    form.id = 'contribution-form';

    const reportContainer = document.createElement('div');
    reportContainer.id = 'expense-report';

    contributions.forEach((contribution) => {
        const contributionGroup = document.createElement('div');
        contributionGroup.classList.add('contribution-group');

        const contributionLabel = document.createElement('label');
        contributionLabel.textContent = contribution.name;
        contributionGroup.appendChild(contributionLabel);

        const contributionInput = document.createElement('input');

        contributionInput.type = 'number';
        contributionInput.name = contribution.name;
        contributionInput.setAttribute('min', '0');
        contributionInput.setAttribute('step', '0.01');
        contributionInput.placeholder = 'Enter amount';

        contributionGroup.appendChild(contributionInput);

        contributionInput.addEventListener('input', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const liveContributionAmounts = Object.fromEntries(formData.entries()) as Record<string, string>;

            const encodedContributionAmounts = utils.base64URLEncode(JSON.stringify(liveContributionAmounts));
            window.history.replaceState({}, '', `?contributions=${encodedContributionAmounts}`);

            liveContributionAmounts[contribution.name] = contributionInput.value;
            const liveExpenseReport = calculateExpenseReport(liveContributionAmounts, config);

            generateExpenseReport(liveExpenseReport);
        });

        form.appendChild(contributionGroup);
    });

    container.appendChild(form);
    container.appendChild(reportContainer);

    loadFormFromURL(config);
};
